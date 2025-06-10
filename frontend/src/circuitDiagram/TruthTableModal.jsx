import React from "react";

export default function TruthTableModal({
  isOpen,
  onClose,
  tableData,
  inputLabels,
  outputLabels,
}) {
  if (!isOpen) return null;

  const hasData = inputLabels?.length > 0 && outputLabels?.length > 0 && tableData?.length > 0;

  const download = (type) => {
    const filename = `truth-table.${type}`;
    let content, mime;

    if (type === "json") {
      content = JSON.stringify(tableData);
      mime = "application/json";
    } else {
      const header = [...inputLabels, ...outputLabels];
      const rows = tableData.map((row) => [...row.inputs, ...row.outputs]);
      content = [header, ...rows].map((r) => r.join(",")).join("\n");
      mime = "text/csv";
    }

    const blob = new Blob([content], { type: mime });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 w-[90%] max-w-2xl shadow">
        <h3 className="text-lg font-medium mb-3">Truth Table</h3>

        {!hasData ? (
          <div className="text-center text-gray-600 p-6">
            ⚠️ Please add at least one <strong>input</strong> and one <strong>output</strong> to generate a truth table.
          </div>
        ) : (
          <>
            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  {[...inputLabels, ...outputLabels].map((label, i) => (
                    <th key={i} className="border px-2 py-1">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr key={i}>
                    {[...row.inputs, ...row.outputs].map((val, j) => (
                      <td key={j} className="border px-2 py-1 text-center">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex gap-2 mt-4 justify-end text-sm">
              <button
                onClick={() => download("csv")}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                CSV
              </button>
              <button
                onClick={() => download("json")}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                JSON
              </button>
            </div>
          </>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-400 text-white rounded text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
