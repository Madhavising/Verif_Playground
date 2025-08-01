import { useEffect, useRef, useState, useCallback } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import "../App.css";
import { baseUrl } from "../api";
import html2pdf from "html2pdf.js";
import { useSelector } from "react-redux";
import HtmlPopModel from "../components/htmlPopUpModel";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeft } from "lucide-react";

function DocSphere(props) {
  const editorRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [showOutputModal, setShowOutputModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [fileNameInput, setFileNameInput] = useState("");
  const [saveType, setSaveType] = useState("pdf");
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [pdfBase64, setPdfBase64] = useState(null);
  const [pdfFileName, setPdfFileName] = useState("");
  const [showPdfSaveModal, setShowPdfSaveModal] = useState(false);
  const [pdfPopup, setPdfPopup] = useState(false);
  const { user } = useSelector((state) => state);
  const location = useLocation();
  const { id } = location.state || {};

  const navigate = useNavigate();

  useEffect(() => {
    const fetchScript = async () => {
      if (!id) return;

      try {
        const { data } = await axios.get(`${baseUrl}/api/getScript/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        let response = data.data;
        const fileType = response.fileName.split(".").pop();

        if (fileType === "pdf" && response.fileType === "pdf") {
          const base64Data = response.base64;
          const decoded = `data:application/pdf;base64,${base64Data}`;
          setPdfBase64(decoded);
          setPdfPopup(true);
        } else {
          if (data?.data?.htmlData) {
            editorRef.current?.setContent(response.htmlData);
          } else {
            console.warn("No HTML data found.");
          }
        }
      } catch (error) {
        console.error("Error fetching script:", error);
      }
    };

    fetchScript();
  }, [id]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading Profile...
        </div>
      </div>
    );
  }

  const { _id, companyName } = user.userData;

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

      // Upload the file
      const response = await axios.post(
        `${baseUrl}/waveform/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const outputUrl = response.data.output;
      const fullOutputUrl = `${baseUrl}${outputUrl}`;

      // Convert image at fullOutputUrl to base64
      const base64Image = await convertImageUrlToBase64(fullOutputUrl);

      // Set the base64 string (instead of the URL)
      setGeneratedHtml(base64Image);
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

  const convertImageUrlToBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handlePdfSave = useCallback(async () => {
    if (!pdfBase64 || !pdfFileName.trim()) {
      alert("Missing PDF content or file name.");
      return;
    }

    const extractBase64Data = pdfBase64.split(",")[1] || pdfBase64;

    const payload = {
      base64: extractBase64Data,
      fileType: "pdf",
      fileName: `${pdfFileName}.pdf`,
      userId: _id,
      organization: companyName,
    };

    try {
      await axios.post(`${baseUrl}/api/createScript`, payload);

      toast.success("Document saved successfully!");

      setShowPdfSaveModal(false);
      setPdfFileName("");
      setPdfBase64(null);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save PDF.");
    }
  }, [pdfBase64, pdfFileName, baseUrl, _id, companyName]);

  function openPdfUploadDialog(editor) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";

    input.onchange = function () {
      const file = input.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        const base64Data = e.target.result;

        editor.windowManager.open({
          title: "PDF Preview",
          size: "large",
          body: {
            type: "panel",
            items: [
              {
                type: "htmlpanel",
                html: `
                <style>
                  html, body {
                  margin: 0;
                  padding: 0;
                  overflow: hidden;
                }
                .pdf-preview-container {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100vw;
                  height: 100vw!important;
                  z-index: 9999;
                  background: #fff;
                  display: flex;
                  flex-direction: column;
                }
                .pdf-preview-container iframe {
                  width: 100%;
                  height: 100%;
                  border: none;
                  flex-grow: 1;
                </style>
                <div class="pdf-preview-container" id="pdfPreview">
                  <iframe src="${base64Data}"></iframe>
                </div>
              `,
              },
            ],
          },
          buttons: [
            {
              type: "cancel",
              text: "Close",
              onclick: function () {
                document.getElementById("pdfPreview")?.remove();
                editor.windowManager.close();
              },
            },
            {
              type: "submit",
              text: "Save",
              primary: true,
            },
          ],
          onSubmit: function (api) {
            setPdfBase64(base64Data);
            setShowPdfSaveModal(true); // Open your modal
            api.close();
          },
        });
      };

      reader.readAsDataURL(file);
    };

    input.click();
  }

  const handleInsertToEditor = () => {
    if (editorRef.current && generatedHtml) {
      editorRef.current.insertContent(`
        <div style="width: 100%; text-align: center; margin: 10px 0;">
          <img src="${generatedHtml}" alt="Waveform" style="width: 80%; max-width: 90%;" />
        </div>
      `);
    }
    setShowOutputModal(false);
  };

  const saveContentToDatabase = useCallback(
    async (content, fileName) => {
      try {
        const payload = {
          fileType: saveType,
          fileName,
          userId: _id,
          organization: companyName,
          ...(saveType === "pdf" ? { base64: content } : { htmlData: content }),
        };

        await axios.post(`${baseUrl}/api/createScript`, payload);

        toast.success("Document saved successfully!");
      } catch (err) {
        console.error("Save to DB failed:", err);
        alert("Database save failed.");
      }
    },
    [_id, companyName, saveType]
  );

  const handleSaveDocument = async () => {
    const content = editorRef.current?.getContent();
    const fileName = fileNameInput.trim();

    if (!content || !fileName) {
      alert("Can't save! Your document is empty or filename missing.");
      return;
    }

    try {
      const container = document.createElement("div");
      container.innerHTML = content;

      // Step 1: Generate PDF and get it as Blob
      const pdfBlob = await html2pdf()
        .set({
          margin: 10,
          filename: `${fileName}.pdf`, // Optional - used if you still want to allow user to download
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(container)
        .outputPdf("blob");

      // Step 2: Convert Blob to base64
      const base64Pdf = await blobToBase64(pdfBlob);

      // Step 3: Save base64 to database
      await saveContentToDatabase(base64Pdf, `${fileName}.pdf`);

      await html2pdf()
        .set({
          margin: 10,
          filename: `${fileName}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(container)
        .save();

      setShowSaveModal(false);
      setFileNameInput("");
    } catch (err) {
      console.error("Error saving document:", err);
      alert("Failed to save as PDF.");
    }
  };

  // Utility to convert Blob to base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]); // removes the prefix like `data:application/pdf;base64,`
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const saveContentAsHtml = async () => {
    const content = editorRef.current?.getContent();
    const fileName = fileNameInput.trim();

    if (!content || !fileName) {
      alert("Can't save! Your document is empty or filename missing.");
      return;
    }

    try {
      await saveContentToDatabase(content, `${fileName}.html`);

      const blob = new Blob([content], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.html`;
      a.click();

      URL.revokeObjectURL(url);

      setShowSaveModal(false);
      setFileNameInput("");
    } catch (err) {
      console.error("Error saving HTML:", err);
      alert("Failed to save as HTML.");
    }
  };

  const config = props.config || {};
  const editorId = config.id || "default-editor-id";

  return (
    <div className="p-4 bg-gray-50 shadow-lg w-full h-full">
      <ToastContainer />
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

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Save Document as {saveType === "pdf" ? "PDF" : "HTML"}
            </h2>
            <input
              type="text"
              value={fileNameInput}
              onChange={(e) => setFileNameInput(e.target.value)}
              placeholder="Enter file name"
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  saveType === "pdf"
                    ? handleSaveDocument()
                    : saveContentAsHtml()
                }
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Document
              </button>
            </div>
          </div>
        </div>
      )}

      {showPdfSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Save PDF Document
            </h2>
            <input
              type="text"
              value={pdfFileName}
              onChange={(e) => setPdfFileName(e.target.value)}
              placeholder="Enter file name"
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPdfSaveModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePdfSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={!pdfFileName.trim()}
              >
                Save Document
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

      {/* HTML Pop Model */}
      {showOpenModal && (
        <HtmlPopModel
          isOpen={showOpenModal}
          onClose={() => setShowOpenModal(false)}
          setData={(value) => {
            const closeModal = () => setShowOpenModal(false);

            if (value.fileType === "pdf") {
              setPdfPopup(true);
              setPdfBase64(value.src);
              closeModal();
              return;
            }

            // Handle normal HTML content
            setPdfBase64(null); // Clear PDF preview if switching back to HTML
            closeModal();

            if (editorRef.current) {
              editorRef.current.setContent(value);
            }
          }}
        />
      )}

      {/* TinyMCE Editor */}
      {/* ... all your modals before here remain unchanged ... */}

      {/* Render PDF Preview in Iframe OR TinyMCE Editor */}
      {pdfPopup && pdfBase64 ? (
        <div className="w-full h-[90vh] border rounded overflow-hidden shadow-inner">
          <button
            onClick={() => {
              setPdfPopup(false); // or clear pdfBase64 if needed
              setPdfBase64(""); // optional: reset base64 data
            }}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800   shadow-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <iframe
            src={`data:application/pdf;base64,${
              pdfBase64.split(",")[1] || pdfBase64
            }`}
            title="PDF Preview"
            className="w-full h-full"
            frameBorder="0"
          />
        </div>
      ) : (
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
            selector: "textarea",
            plugins: [
              "advlist",
              "autolink",
              "quickbars",
              "emoticons",
              "wordcount",
              "lists",
              "link",
              "image",
              "imagetools",
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
              "pagebreak",
              "fullscreen",
              "exportpdf",
            ],
            toolbar1:
              "undo redo exportpdf print quicklink | bold italic blockquote link | blocks | fontsize | fontfamily | fontsizeinput | fullscreen | lineheight forecolor | bullist numlist outdent indent | alignleft aligncenter alignright alignjustify | table | wave blockdiagram circuitdiagram | emoticons wordcount searchreplace quickimage pagebreak",
            quickbars_insert_toolbar: false,
            menu: {
              file: {
                title: "File",
                items:
                  "newdocument openfilemenu insertpdf savePdf saveHtml restoredraft | preview print",
              },
            },
            setup: (editor) => {
              editor.ui.registry.addMenuItem("openfilemenu", {
                text: "Open",
                icon: "browse",
                onAction: () => setShowOpenModal(true),
              });
              editor.ui.registry.addMenuItem("savePdf", {
                text: "Save as PDF",
                icon: "export-pdf",
                onAction: () => {
                  setSaveType("pdf");
                  setShowSaveModal(true);
                },
              });
              editor.ui.registry.addMenuItem("insertpdf", {
                text: "Upload PDF",
                icon: "upload",
                onAction: function () {
                  openPdfUploadDialog(editor);
                },
              });
              editor.ui.registry.addMenuItem("saveHtml", {
                text: "Save as HTML",
                icon: "new-document",
                onAction: () => {
                  setSaveType("html");
                  setShowSaveModal(true);
                },
              });
              editor.ui.registry.addButton("wave", {
                text: "Wave",
                onAction: () => {
                  if (!showModal && !showOutputModal) setShowModal(true);
                },
              });
              editor.ui.registry.addButton("blockdiagram", {
                text: "Block Diagram",
                onAction: () => {
                  alert("Block Diagram feature not implemented yet.");
                },
              });
              editor.ui.registry.addButton("circuitdiagram", {
                text: "Circuit Diagram",
                onAction: () => {
                  navigate("/circuit-diagram"); 
                },
              });
            },
            extended_valid_elements:
              "iframe[src|width|height|style|sandbox|allowfullscreen|frameborder]",
            valid_elements: "*[*]",
            content_style:
              "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; padding: 12px; }",
          }}
        />
      )}
    </div>
  );
}

export default DocSphere;
