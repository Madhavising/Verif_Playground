import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../App.css";

function DocSphere(props) {
  const editorRef = useRef(null);

  const handleEditorInit = (evt, editor) => {
    editorRef.current = editor;
  };

  const callWaveApi = async () => {
    try {
      const response = await fetch("https://picsum.photos/400/300");
      if (response.ok) {
        const imageUrl = response.url;
        console.log("Image URL:", imageUrl);

        // Insert the image into TinyMCE editor
        if (editorRef.current) {
          editorRef.current.insertContent(
            `<img src="${imageUrl}" alt="Random Image" style="max-width: 100%; height: auto;" />`
          );
        }
      } else {
        console.error("Image API Error:", response.statusText);
        alert("Failed to fetch the image. Please try again.");
      }
    } catch (error) {
      console.error("Image API Error:", error);
      alert("An error occurred while fetching the image.");
    }
  };

  const callBlockDiagramApi = async () => {
    try {
      // Fetching the image URL directly from Picsum (or you can modify it to use a valid API that returns JSON content)
      const response = await fetch("https://picsum.photos/400/300");
      if (response.ok) {
        const imageUrl = response.url; // Get the image URL directly
        console.log("Block Diagram Image URL:", imageUrl);

        // Insert the image into TinyMCE editor
        if (editorRef.current) {
          editorRef.current.insertContent(
            `<div style="border: 2px solid black; padding: 10px;"><img src="${imageUrl}" alt="Block Diagram" style="max-width: 100%; height: auto;" /></div>`
          );
        }
      } else {
        console.error("Block Diagram API Error:", response.statusText);
        alert("Failed to load block diagram content. Please try again.");
      }
    } catch (error) {
      console.error("Block Diagram API Error:", error);
      alert("An error occurred while calling the Block Diagram API.");
    }
  };

  const config = props.config || {}; // Ensure config always has a value
  const editorId = config.id || "default-editor-id";

  return (
    <div
      className="mt-11 p-4 bg-gray-50 shadow-lg w-full "
      style={{ height: "84vh" }}
    >
      <Editor
        onInit={(evt, editor) => handleEditorInit(evt, editor)}
        id={editorId}
        tinymceScriptSrc={
          import.meta.env.BASE_URL + "tinymce/js/tinymce/tinymce.min.js"
        }
        initialValue={config.html || ""}
        init={{
          height: "100%",
          width: "100%",
          menubar: true,
          branding: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
          ],
          toolbar:
            "undo redo | bold italic forecolor | fontsize | bullist numlist outdent indent | alignleft aligncenter alignright alignjustify | table | wave blockdiagram",
          menubar: "file edit insert view format tools table",
          setup: (editor) => {
            // Add Wave Button
            editor.ui.registry.addButton("wave", {
              text: "Wave",
              onAction: callWaveApi,
            });

            // Add Block Diagram Button
            editor.ui.registry.addButton("blockdiagram", {
              text: "Block Diagram",
              onAction: callBlockDiagramApi,
            });
          },
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; margin: 0; }",
        }}
      />
    </div>
  );
}

export default DocSphere;
