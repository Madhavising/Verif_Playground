import React, { useState } from "react";
import * as XLSX from "xlsx";

const columns = [
  "ACLK",
  "Time",
  "ARADDR",
  "ARVALID",
  "ARREADY",
  "RDATA",
  "RLAST",
  "RVALID",
  "RREADY",
];

// Empty row template
const emptyRow = () => ({
  ACLK: "",
  Time: "",
  ARADDR: "",
  ARVALID: "",
  ARREADY: "",
  RDATA: "",
  RLAST: "",
  RVALID: "",
  RREADY: "",
});

export default function AXISignalInput() {
  const [rows, setRows] = useState([emptyRow()]);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, emptyRow()]);
  };

  const deleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AXI Signals");
  
    // Export as .xls format
    XLSX.writeFile(workbook, "axi_signals.xls", { bookType: "xls" });
  };
  

  return (
    <div className="p-6 max-w-full overflow-x-auto">
      <table className="table-auto border border-gray-300 text-sm w-full">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col} className="border px-2 py-1">
                {col}
              </th>
            ))}
            <th className="border px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="text-center">
              {columns.map((col) => (
                <td key={col} className="border px-2 py-1">
                  <input
                    type="text"
                    value={row[col]}
                    onChange={(e) => handleChange(idx, col, e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded"
                    placeholder={col}
                  />
                </td>
              ))}
              <td className="border px-2 py-1">
                <button
                  onClick={() => deleteRow(idx)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex gap-4">
        <button
          onClick={addRow}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Row
        </button>
        <button
          onClick={generateExcel}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Generate Excel
        </button>
      </div>
    </div>
  );
}
