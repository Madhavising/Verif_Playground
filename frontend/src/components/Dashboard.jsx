import React from "react";
import { Eye, Share2, Trash2 } from "lucide-react";

export default function Dashboard() {
  const recentFiles = [
    {
      name: "Project Plan.docx",
      reason: "Client update",
      owner: "You",
      timestamp: "2024-04-29 10:30",
      type: "docx",
    },
    {
      name: "Presentation.pptx",
      reason: "Team review",
      owner: "Jane Smith",
      timestamp: "2024-04-28 15:00",
      type: "pptx",
    },
    {
      name: "Budget.xlsx",
      reason: "Quarterly update",
      owner: "Mark Lee",
      timestamp: "2024-04-27 09:45",
      type: "xlsx",
    },
    {
      name: "Notes.txt",
      reason: "Meeting summary",
      owner: "John Doe",
      timestamp: "2024-04-26 12:10",
      type: "txt",
    },
    {
      name: "Report.pdf",
      reason: "Audit",
      owner: "Emma Wilson",
      timestamp: "2024-04-25 14:30",
      type: "pdf",
    },
  ];

  const activityLog = [
    { name: "John Doe", action: "uploaded", file: "Image.png" },
    { name: "You", action: "edited", file: "Report.docx" },
    { name: "Michael Brown", action: "shared", file: "Budget.xlsx" },
    { name: "You", action: "uploaded", file: "Overview.pdf" },
    { name: "Emma Wilson", action: "commented", file: "Proposal.docx" },
    { name: "Emma Wilson", action: "commented", file: "Report.txt" },
  ];

  const handleView = (fileName) => alert(`Opening ${fileName}...`);
  const handleShare = (fileName) => alert(`Sharing ${fileName}...`);
  const handleDelete = (fileName) => alert(`Deleting ${fileName}...`);

  return (
    <div className="flex">
      {/* Main content */}
      <main className="flex-1 bg-gray-50 overflow-y-auto p-4 space-y-8">
        {/* Top Nav */}
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {/* <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Welcome back, User</span>
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">U</div>
          </div> */}
        </header>

        {/* Recent Files */}
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Files</h2>
          <div className="overflow-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Reason</th>
                  <th className="py-2">Owner</th>
                  <th className="py-2">Timestamp</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentFiles.map((file, idx) => (
                  <tr key={idx} className="hover:bg-gray-100 border-b">
                    <td className="py-2">{file.name}</td>
                    <td className="py-2">{file.reason}</td>
                    <td className="py-2">{file.owner}</td>
                    <td className="py-2 text-xs text-gray-500">
                      {file.timestamp}
                    </td>
                    <td className="py-2 space-x-2">
                      <button
                        onClick={() => handleView(file.name)}
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleShare(file.name)}
                        title="Share"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(file.name)}
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

        {/* Activity */}
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {activityLog.map((activity, idx) => (
              <li key={idx} className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
                  {activity.name[0]}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">{activity.name}</span>{" "}
                  {activity.action}{" "}
                  <span className="text-gray-500">{activity.file}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
