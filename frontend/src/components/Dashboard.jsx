import { useEffect, useState } from "react";
import { Eye, Share2, Trash2 } from "lucide-react";
import { baseUrl } from "../api";
import axios from "axios";
import moment from "moment/moment";

export default function Dashboard() {
  const [recentFiles, setRecentFiles] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [script, setScript] = useState("");
  const [pageFiles, setPageFiles] = useState(1);
  const [pageActivity, setPageActivity] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPagesScript, setTotalPagesScript] = useState(0);
  const [totalPagesActivity, setTotalPagesActivity] = useState(0);

  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isLoadingActivity, setIsLoadingActivity] = useState(false);

  // const getAllRecentFiles = async () => {
  //   try {
  //     setIsLoadingFiles(true);
  //     let { data } = await axios.get(
  //       `${baseUrl}/api/getAllScript?page=${pageFiles}&limit=${limit}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     const decodedText = atob(data.data[0]?.file || "");
  //     setScript(decodedText);
  //     setRecentFiles(data.data);
  //     setTotalPagesScript(data.totalPages);
  //   } catch (error) {
  //     console.log("get recentFiles error:", error.message);
  //   } finally {
  //     setIsLoadingFiles(false);
  //   }
  // };

  // const getAllActivity = async () => {
  //   try {
  //     setIsLoadingActivity(true);
  //     let { data } = await axios.get(
  //       `${baseUrl}/api/getAllActivity?page=${pageActivity}&limit=${limit}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     setRecentActivity(data.data);
  //     setTotalPagesActivity(data.totalPages);
  //   } catch (error) {
  //     console.log("get recentActivity error:", error.message);
  //   } finally {
  //     setIsLoadingActivity(false);
  //   }
  // };

  const deleteScript = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/deleteScript/${id}`);
      getAllRecentFiles();
    } catch (error) {
      console.log("delete error:", error.message);
    }
  };

  // useEffect(() => {
  //   getAllRecentFiles();
  // }, [pageFiles, limit]);

  // useEffect(() => {
  //   getAllActivity();
  // }, [pageActivity, limit]);

  return (
    <div className="flex">
      <main className="flex-1 bg-gray-50 overflow-y-auto p-4 space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>

        {/* Recent Files */}
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold mb-4">Recent Files</h2>
            <div>
              <button
                onClick={() => setPageFiles((prev) => Math.max(prev - 1, 1))}
                disabled={pageFiles === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setPageFiles((prev) => Math.min(prev + 1, totalPagesScript))
                }
                disabled={pageFiles === totalPagesScript}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Owner</th>
                  <th className="py-2">Company</th>
                  <th className="py-2">Timestamp</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingFiles
                  ? Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <tr key={i} className="animate-pulse border-b">
                          <td className="py-2">
                            <div className="h-4 w-24 bg-gray-300 rounded skeleton" />
                          </td>
                          <td className="py-2">
                            <div className="h-4 w-20 bg-gray-300 rounded skeleton" />
                          </td>
                          <td className="py-2">
                            <div className="h-4 w-20 bg-gray-300 rounded skeleton" />
                          </td>
                          <td className="py-2">
                            <div className="h-4 w-28 bg-gray-300 rounded skeleton" />
                          </td>
                          <td className="py-2 space-x-2">
                            <div className="h-4 w-16 bg-gray-300 rounded skeleton" />
                          </td>
                        </tr>
                      ))
                  : recentFiles.map((file, idx) => (
                      <tr key={idx} className="hover:bg-gray-100 border-b">
                        <td className="py-2">{file.fileName}</td>
                        <td className="py-2">{file.name}</td>
                        <td className="py-2">{file.organization}</td>
                        <td className="py-2 text-xs text-gray-500">
                          {moment(file.createdAt).format(
                            "dddd, YYYY-MM-DD HH:mm"
                          )}
                        </td>
                        <td className="py-2 space-x-2">
                          <button onClick={() => setIsOpen(true)} title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setIsShareOpen(true)}
                            title="Share"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteScript(file._id)}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* View Pop-up */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-4">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="font-bold text-gray-700 mb-2">Output:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-[70vh]">
                {script}
              </pre>
            </div>
          </div>
        )}

        {/* Share Pop-up */}
        {isShareOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
              <button
                onClick={() => setIsShareOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="font-bold text-gray-800 mb-4">
                Share this content
              </h3>
              <div className="space-y-3">
                {/* Copy Link */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(baseUrl);
                    alert("Link copied to clipboard!");
                  }}
                  className="w-full text-left px-4 py-2 border rounded hover:bg-gray-100"
                >
                  📋 Copy Link
                </button>

                {/* Email */}
                <a
                  href={`mailto:?subject=Check this out&body=${encodeURIComponent(
                    `Check this link: ${baseUrl}`
                  )}`}
                  className="block px-4 py-2 border rounded hover:bg-gray-100"
                >
                  ✉️ Share via Email
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Check this link: ${baseUrl}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 border rounded hover:bg-gray-100"
                >
                  💬 Share on WhatsApp
                </a>

                {/* Twitter */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    baseUrl
                  )}&text=${encodeURIComponent("Check this out!")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 border rounded hover:bg-gray-100"
                >
                  🐦 Share on Twitter
                </a>

                {/* Web Share API for mobile */}
                <button
                  onClick={async () => {
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: "Shared via Dashboard",
                          text: "Check this out!",
                          url: baseUrl,
                        });
                      } catch (err) {
                        console.error("Sharing failed", err);
                      }
                    } else {
                      alert("Web Share API is not supported in your browser.");
                    }
                  }}
                  className="w-full text-left px-4 py-2 border rounded hover:bg-gray-100"
                >
                  📱 Share via Device
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Activity */}
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold mb-4">Recent Files</h2>
            <div>
              <button
                onClick={() => setPageActivity((prev) => Math.max(prev - 1, 1))}
                disabled={pageActivity === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setPageActivity((prev) =>
                    Math.min(prev + 1, totalPagesActivity)
                  )
                }
                disabled={pageActivity === totalPagesActivity}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
          <ul className="space-y-4">
            {isLoadingActivity
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <li
                      key={i}
                      className="flex items-center space-x-3 animate-pulse"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-300 skeleton" />
                      <div className="h-4 w-48 bg-gray-300 rounded skeleton" />
                    </li>
                  ))
              : recentActivity.map((activity, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
                      {activity.name[0]}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">{activity.name}</span>{" "}
                      uploaded{" "}
                      <span className="text-gray-500">{activity.fileName}</span>
                    </div>
                  </li>
                ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
