import { useEffect, useState } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import * as XLSX from "xlsx";
import FileMenu from "./FileMenu";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { baseUrl } from "../api";
import { useSelector } from "react-redux";
import UserPopupModal from "../components/ScriptPopUpModel";

const InputField = () => {
  const navigate = useNavigate();
  const [ipName, setIpName] = useState("");
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { id } = location.state || {};

  const [rows, setRows] = useState(
    Array.from({ length: 7 }, () => ({
      registerName: "",
      offset: "",
      readWrite: "",
      fields: [""],
      defaultValue: [""],
      resetValue: [""],
      description: "",
    }))
  );

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

  const handleSaveToDatabase = async () => {
    if (!ipName) {
      alert("Please enter an IP Name before saving.");
      return;
    }

    const userId = user?.userData?._id || "";
    const organization = user?.userData?.companyName || "";

    const filePayload = {
      fileName: `${ipName}_register_definitions.xlsx`,
      fileType: "xlsx",
      formData: {
        ipName: ipName,
        data: rows,
      },
      userId: userId,
      organization: organization,
    };

    try {
      const res = await axios.post(`${baseUrl}/api/createScript`, filePayload);
      if (res.status === 201) {
        alert("File saved successfully!");
      } else {
        alert(`Failed to save file: ${res.statusText}`);
      }
    } catch (error) {
      console.error("Error saving file:", error.message);
      alert("An error occurred while saving the file.");
    }
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
        setIsOpen(true);
        break;
      case "save":
        handleSaveToDatabase();
        break;
      case "downloadXLS":
        handleDownload();
        break;
      case "downloadPDF":
        downloadPDF();
        break;
      case "uploadRegisterPDF":
        alert("Upload Register PDF functionality is not implemented yet.");
        break;
      default:
        break;
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Registers Data", 14, 15);

    // Table header (column names)
    const head = [
      [
        "Register Name",
        "Offset",
        "Read/Write",
        "Fields",
        "Default Value",
        "Reset Value",
        "Description",
      ],
    ];

    // Table body (rows)
    const body = rows.map((item) => [
      item.registerName,
      item.offset,
      item.readWrite,
      item.fields.join(", "),
      item.defaultValue.join(", "),
      item.resetValue.join(", "),
      item.description,
    ]);

    autoTable(doc, {
      startY: 20,
      head: head,
      body: body,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save("registers.pdf");
  };

  useEffect(() => {
    const fetchScript = async () => {
      if (!id) return;

      try {
        const { data } = await axios.get(`${baseUrl}/api/getScript/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setRows(data.data.formData.data);
      } catch (error) {
        console.error("Error fetching script:", error.message);
      }
    };

    fetchScript();
  }, [id]);

  return (
    <div className="max-w-screen p-2  font-normal bg-white shadow-xl rounded-xl border border-gray-200">
      {/* Top Bar */}
      <div className="flex justify-start gap-2 items-center bg-white border border-gray-300 shadow-sm rounded-t-md px-2 py-2">
        {/* Left: File Menu */}
        <div className="flex items-center gap-4">
          <FileMenu onAction={handleDropdownAction} />
        </div>

        {/* Right: Tool Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/uvm-reg-block")}
            className="tool-button"
            title="Register Abstraction Layer"
          >
            RAL
          </button>

          <button className="tool-button" title="Design View">
            Design
          </button>

          <button className="tool-button" title="C Header View">
            C Define
          </button>
        </div>
      </div>
      {/* IP name */}
      <div className="mb-2 mt-2 flex items-center gap-2">
        <label htmlFor="ipName" className="text-lg font-semibold">
          &nbsp; IP Name:
        </label>
        <input
          id="ipName"
          type="text"
          value={ipName}
          onChange={(e) => setIpName(e.target.value)}
          placeholder="Enter IP Name"
          className="border rounded w-32 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
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
                "Field",
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

      <UserPopupModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setRows={setRows}
      />

      {/* Bottom Actions */}
      <div className="flex justify-start mt-6 gap-4">
        <button
          onClick={handleAddRow}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow"
          title="Add Row"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default InputField;
