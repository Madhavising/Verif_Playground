import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { db } from "../firebase-config";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import "react-quill/dist/quill.snow.css";
import { throttle } from "lodash";

function TextEditor() {
  const [isEditing, setIsEditing] = useState(false); // Removed type annotation for JSX
  const quillRef = useRef(null); // TypeScript annotation removed
  const documentRef = doc(db, "documents", "example-doc");

  // Track if a change was made by the local user
  const isLocalChange = useRef(false);

  // Save content to Firestore with throttle
  const saveContent = throttle(() => {
    if (quillRef.current && isLocalChange.current) {
      const content = quillRef.current.getEditor().getContents();
      console.log("Saving content to Firestore:", content);
      setDoc(documentRef, { content: content.ops }, { merge: true })
        .then(() => console.log("Content saved successfully"))
        .catch(console.error);
      isLocalChange.current = false; // Reset local change flag after saving
    }
  }, 1000);

  useEffect(() => {
    if (quillRef.current) {
      // Load initial content from Firestore
      getDoc(documentRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const savedContent = docSnap.data().content;
            if (savedContent) {
              quillRef.current.getEditor().setContents(savedContent);
            }
          } else {
            console.log("No document found, starting with empty editor.");
          }
        })
        .catch(console.error);

      // Listen for Firestore document updates in real-time
      const unsubscribe = onSnapshot(documentRef, (snapshot) => {
        if (snapshot.exists()) {
          const newContent = snapshot.data().content;

          if (!isEditing) {
            const editor = quillRef.current?.getEditor();
            const currentCursorPosition = editor?.getSelection()?.index || 0; // Get the current cursor position

            // Apply content update silently to avoid triggering `text-change`
            editor?.setContents(newContent, "silent");

            // Restore cursor position after content update
            editor?.setSelection(currentCursorPosition);
          }
        }
      });

      // Listen for local text changes and save to Firestore
      const editor = quillRef.current?.getEditor();
      editor?.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") {
          isLocalChange.current = true; // Mark change as local
          setIsEditing(true);
          saveContent();

          // Reset editing state after 5 seconds of inactivity
          setTimeout(() => setIsEditing(false), 5000);
        }
      });

      return () => {
        unsubscribe();
        editor?.off("text-change");
      };
    }
  }, [isEditing]); // Re-run the effect when editing state changes

  return (
    <div>
    <div className="google-docs-editor mt-10">
      <ReactQuill ref={quillRef} />
    </div>
    </div>
  );
}

export default TextEditor;
