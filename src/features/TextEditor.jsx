// import React, { useEffect, useRef, useState } from "react";
// import ReactQuill from "react-quill";
// import { db } from "../firebase-config";
// import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
// import "react-quill/dist/quill.snow.css";
// import { throttle } from "lodash";

// function TextEditor() {
//   const [isEditing, setIsEditing] = useState(false); // Removed type annotation for JSX
//   const quillRef = useRef(null); // TypeScript annotation removed
//   const documentRef = doc(db, "documents", "example-doc");

//   // Track if a change was made by the local user
//   const isLocalChange = useRef(false);

//   // Save content to Firestore with throttle
//   const saveContent = throttle(() => {
//     if (quillRef.current && isLocalChange.current) {
//       const content = quillRef.current.getEditor().getContents();
//       console.log("Saving content to Firestore:", content);
//       setDoc(documentRef, { content: content.ops }, { merge: true })
//         .then(() => console.log("Content saved successfully"))
//         .catch(console.error);
//       isLocalChange.current = false; // Reset local change flag after saving
//     }
//   }, 1000);

//   useEffect(() => {
//     if (quillRef.current) {
//       // Load initial content from Firestore
//       getDoc(documentRef)
//         .then((docSnap) => {
//           if (docSnap.exists()) {
//             const savedContent = docSnap.data().content;
//             if (savedContent) {
//               quillRef.current.getEditor().setContents(savedContent);
//             }
//           } else {
//             console.log("No document found, starting with empty editor.");
//           }
//         })
//         .catch(console.error);

//       // Listen for Firestore document updates in real-time
//       const unsubscribe = onSnapshot(documentRef, (snapshot) => {
//         if (snapshot.exists()) {
//           const newContent = snapshot.data().content;

//           if (!isEditing) {
//             const editor = quillRef.current?.getEditor();
//             const currentCursorPosition = editor?.getSelection()?.index || 0; // Get the current cursor position

//             // Apply content update silently to avoid triggering `text-change`
//             editor?.setContents(newContent, "silent");

//             // Restore cursor position after content update
//             editor?.setSelection(currentCursorPosition);
//           }
//         }
//       });

//       // Listen for local text changes and save to Firestore
//       const editor = quillRef.current?.getEditor();
//       editor?.on("text-change", (delta, oldDelta, source) => {
//         if (source === "user") {
//           isLocalChange.current = true; // Mark change as local
//           setIsEditing(true);
//           saveContent();

//           // Reset editing state after 5 seconds of inactivity
//           setTimeout(() => setIsEditing(false), 5000);
//         }
//       });

//       return () => {
//         unsubscribe();
//         editor?.off("text-change");
//       };
//     }
//   }, [isEditing]); // Re-run the effect when editing state changes

//   return (
//     <div>
//     <div className="google-docs-editor mt-10">
//       <ReactQuill ref={quillRef} />
//     </div>
//     </div>
//   );
// }

// export default TextEditor;


import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { db } from "../firebase-config";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import "react-quill/dist/quill.snow.css";
import debounce from "lodash/debounce";

function TextEditor() {
  const [title, setTitle] = useState("Untitled Document");
  const [isEditing, setIsEditing] = useState(false);
  const quillRef = useRef(null);
  const documentRef = doc(db, "documents", "example-doc");
  const isLocalChange = useRef(false);

  // Save content to Firestore (debounced for performance)
  const saveContent = debounce(() => {
    if (quillRef.current && isLocalChange.current) {
      const content = quillRef.current.getEditor().getContents();
      console.log("Saving content to Firestore:", content);
      setDoc(documentRef, { content: content.ops, title }, { merge: true })
        .then(() => console.log("Content saved successfully"))
        .catch(console.error);
      isLocalChange.current = false;
    }
  }, 1000);

  useEffect(() => {
    if (quillRef.current) {
      // Load initial content and title from Firestore
      getDoc(documentRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const { content, title } = docSnap.data();
            if (content) quillRef.current.getEditor().setContents(content);
            if (title) setTitle(title);
          } else {
            console.log("No document found, starting with empty editor.");
          }
        })
        .catch(console.error);

      // Listen for Firestore document updates
      const unsubscribe = onSnapshot(documentRef, (snapshot) => {
        if (snapshot.exists() && !isEditing) {
          const { content, title } = snapshot.data();
          const editor = quillRef.current?.getEditor();

          if (content) {
            const currentCursorPosition = editor?.getSelection()?.index || 0;
            editor?.setContents(content, "silent");
            editor?.setSelection(currentCursorPosition);
          }
          if (title) setTitle(title);
        }
      });

      // Add local text-change listener
      const editor = quillRef.current?.getEditor();
      editor?.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") {
          isLocalChange.current = true;
          setIsEditing(true);
          saveContent();

          // Reset editing state after 5 seconds
          setTimeout(() => setIsEditing(false), 5000);
        }
      });

      return () => {
        unsubscribe();
        editor?.off("text-change");
      };
    }
  }, [isEditing]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Document Title"
          />
          <div className="text-sm text-gray-600">
            {isEditing ? "Saving..." : "All changes saved"}
          </div>
        </div>

        {/* Text Editor */}
        <div className="p-4">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            modules={quillModules}
            formats={quillFormats}
            className="bg-gray-100 h-[500px] border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

// Toolbar configuration
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["code-block"],
    ["clean"],
  ],
};

// Allowed formats
const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
  "code-block",
];

export default TextEditor;
