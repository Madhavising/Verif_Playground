import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import "../App.css";

function DocSphere(props) {
  const editorRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [showOutputModal, setShowOutputModal] = useState(false);

  const handleEditorInit = (evt, editor) => {
    editorRef.current = editor;
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      alert("Please choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3030/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const outputUrl = response.data.output;
      const fullOutputUrl = `http://localhost:3030${outputUrl}`;
      setGeneratedHtml(fullOutputUrl);
      setShowOutputModal(true);
      setShowModal(false);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Waveform generation failed.");
    } finally {
      setLoading(false);
      setSelectedFile(null);
    }
  };

  const handleInsertToEditor = () => {
    if (editorRef.current && generatedHtml) {
      editorRef.current.insertContent(`
      <div style="width: 100%; text-align: center; margin: 10px 0;">
        <img src="${generatedHtml}" alt="Waveform" style="width: 80%; height: 90%; display: block; max-width: 90%;" />
      </div>
    `);
    }
    setShowOutputModal(false);
  };

  const callBlockDiagramApi = async () => {
    try {
      const response = await fetch("https://picsum.photos/400/300");
      if (response.ok) {
        const imageUrl = response.url;
        if (editorRef.current) {
          editorRef.current.insertContent(
            `<div style="border: 2px solid black; padding: 10px;"><img src="${imageUrl}" alt="Block Diagram" style="max-width: 100%; height: auto;" /></div>`
          );
        }
      } else {
        alert("Failed to load block diagram.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Block diagram API failed.");
    }
  };

  const config = props.config || {};
  const editorId = config.id || "default-editor-id";

  return (
    <div className="p-4 bg-gray-50 shadow-lg w-full" style={{ height: "83vh" }}>
      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Upload Excel File
            </h2>
            <input
              type="file"
              accept=".xls"
              onChange={handleFileChange}
              className="w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Output Modal */}
      {showOutputModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-4xl w-full relative flex flex-col items-center">
            <button
              onClick={() => setShowOutputModal(false)}
              className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
            <img
              src={generatedHtml}
              alt="Generated Waveform"
              className="w-full h-auto max-h-[80vh] object-contain border"
            />
            <button
              onClick={handleInsertToEditor}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Insert to Editor
            </button>
          </div>
        </div>
      )}

      {/* TinyMCE Editor */}
      <Editor
        onInit={handleEditorInit}
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
            editor.ui.registry.addButton("wave", {
              text: "Wave",
              onAction: () => {
                if (!showModal && !showOutputModal) setShowModal(true);
              },
            });

            editor.ui.registry.addButton("blockdiagram", {
              text: "Block Diagram",
              onAction: () => {
                if (!showModal && !showOutputModal) callBlockDiagramApi();
              },
            });
          },
          extended_valid_elements:
            "iframe[src|width|height|style|sandbox|allowfullscreen|frameborder]",
          valid_elements: "*[*]",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; margin: 0; }",
        }}
      />
    </div>
  );
}

export default DocSphere;
