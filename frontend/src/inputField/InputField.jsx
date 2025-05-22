import React, { useState } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import * as XLSX from "xlsx";
import FileMenu from "./FileMenu";
import UVMRegBlock from "../uvmRegBlock/UvmRegBlock";

const InputField = ({ onSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const [rows, setRows] = useState([
    {
      registerName: "",
      offset: "",
      readWrite: "",
      fields: [""],
      defaultValue: [""],
      resetValue: [""],
      description: "",
    },
  ]);

  const handleInputChange = (e, rowIndex, field, subIndex) => {
    const updatedRows = [...rows];
    if (subIndex !== undefined) {
      updatedRows[rowIndex][field][subIndex] = e.target.value;
    } else {
      updatedRows[rowIndex][field] = e.target.value;
    }
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        registerName: "",
        offset: "",
        readWrite: "",
        fields: [""],
        defaultValue: [""],
        resetValue: [""],
        description: "",
      },
    ]);
  };

  const handleDeleteRow = (rowIndex) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmDelete) {
      setRows((prevRows) => prevRows.filter((_, index) => index !== rowIndex));
    }
  };

  const handleAddField = (rowIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].fields.push("");
    updatedRows[rowIndex].defaultValue.push("");
    updatedRows[rowIndex].resetValue.push("");
    setRows(updatedRows);
  };

  const handleDownload = () => {
    const data = rows.flatMap((row) =>
      row.fields.map((field, index) => ({
        "Register Name": index === 0 ? row.registerName : "",
        Offset: index === 0 ? row.offset : "",
        "Read/Write": index === 0 ? row.readWrite : "",
        Fields: field || "",
        "Default value": row.defaultValue[index] || "",
        "Reset value": row.resetValue[index] || "",
        Description: row.description || "",
      }))
    );

    const ws = XLSX.utils.json_to_sheet(data);

    const merges = [];
    let startRow = 1;
    rows.forEach((row) => {
      const endRow = startRow + row.fields.length - 1;
      if (row.fields.length > 1) {
        merges.push(
          { s: { r: startRow, c: 0 }, e: { r: endRow, c: 0 } },
          { s: { r: startRow, c: 1 }, e: { r: endRow, c: 1 } },
          { s: { r: startRow, c: 2 }, e: { r: endRow, c: 2 } }
        );
      }
      startRow = endRow + 1;
    });

    ws["!merges"] = merges;
    ws["!cols"] = [
      { wch: 20 },
      { wch: 10 },
      { wch: 10 },
      { wch: 35 },
      { wch: 15 },
      { wch: 15 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "register_definitions.xlsx");
  };

  const handleDropdownAction = (action) => {
    switch (action) {
      case "new":
        setRows([
          {
            registerName: "",
            offset: "",
            readWrite: "",
            fields: [""],
            defaultValue: [""],
            resetValue: [""],
            description: "",
          },
        ]);
        break;
      case "open":
        alert("Open File functionality is not implemented yet.");
        break;
      case "save":
        alert("Save File functionality is not implemented yet.");
        break;
      case "downloadXLS":
        handleDownload();
        break;
      case "downloadPDF":
        alert("Download PDF functionality is not implemented yet.");
        break;
      case "uploadRegisterPDF":
        alert("Upload Register PDF functionality is not implemented yet.");
        break;
      default:
        break;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 mt-5 bg-white shadow-xl rounded-xl border border-gray-200">
      {/* Top Bar */}
      <div className="flex flex-wrap gap-3 justify-start items-center mb-6 bg-gray-100 p-2 rounded-md shadow text-white">
        {/* File Dropdown */}
        <FileMenu onAction={handleDropdownAction} />

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium">
            <button onClick={() => setShowModal(true)} className=" text-white">
              RAL
            </button>

            {showModal && <UVMRegBlock onClose={() => setShowModal(false)} />}
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium">
            Design
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium">
            C Define
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto border border-gray-200 rounded-md shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              {[
                "Register Name",
                "Offset",
                "Read/Write",
                "Fields",
                "Default value",
                "Reset value",
                "Add Field",
                "Description",
                "Action",
              ].map((header) => (
                <th key={header} className="px-4 py-2 border">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="even:bg-gray-50">
                <td className="border px-2 py-1">
                  <input
                    value={row.registerName}
                    onChange={(e) =>
                      handleInputChange(e, rowIndex, "registerName")
                    }
                    className="w-full px-2 py-1 border rounded-md focus:ring-blue-500"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    value={row.offset}
                    onChange={(e) => handleInputChange(e, rowIndex, "offset")}
                    className="w-full px-2 py-1 border rounded-md focus:ring-blue-500"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    value={row.readWrite}
                    onChange={(e) =>
                      handleInputChange(e, rowIndex, "readWrite")
                    }
                    className="w-full px-2 py-1 border rounded-md focus:ring-blue-500"
                  />
                </td>
                <td className="border px-2 py-1">
                  {row.fields.map((field, fieldIndex) => (
                    <input
                      key={fieldIndex}
                      value={field}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, "fields", fieldIndex)
                      }
                      className="w-full mb-1 px-2 py-1 border rounded-md focus:ring-blue-500"
                    />
                  ))}
                </td>
                <td className="border px-2 py-1">
                  {row.defaultValue.map((val, index) => (
                    <input
                      key={index}
                      value={val}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, "defaultValue", index)
                      }
                      className="w-full mb-1 px-2 py-1 border rounded-md focus:ring-blue-500"
                    />
                  ))}
                </td>
                <td className="border px-2 py-1">
                  {row.resetValue.map((val, index) => (
                    <input
                      key={index}
                      value={val}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, "resetValue", index)
                      }
                      className="w-full mb-1 px-2 py-1 border rounded-md focus:ring-blue-500"
                    />
                  ))}
                </td>
                <td className="border px-2 py-1 text-center">
                  <button
                    onClick={() => handleAddField(rowIndex)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs"
                  >
                    Add
                  </button>
                </td>
                <td className="border px-2 py-1">
                  <textarea
                    value={row.description}
                    onChange={(e) =>
                      handleInputChange(e, rowIndex, "description")
                    }
                    className="w-full px-2 py-1 border rounded-md focus:ring-blue-500"
                  />
                </td>
                <td className="border px-2 py-1 text-center">
                  <button
                    onClick={() => handleDeleteRow(rowIndex)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-start mt-6 gap-4">
        <button
          onClick={handleAddRow}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold shadow"
          title="Add Row"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default InputField;
