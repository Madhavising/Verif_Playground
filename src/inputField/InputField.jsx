// import React, { useState } from "react";
// import * as XLSX from "xlsx";

// const InputField = () => {
//   const initialData = [
//     {
//       registerName: "",
//       offset: "",
//       readWrite: "",
//       fields: [""],
//       defaultValue: [""],
//       resetValue: [""],
//       description: "",
//     },
//   ];

//   const [rows, setRows] = useState(initialData);

//   const handleInputChange = (e, rowIndex, field, subIndex) => {
//     const updatedRows = [...rows];
//     if (subIndex !== undefined) {
//       updatedRows[rowIndex][field][subIndex] = e.target.value;
//     } else {
//       updatedRows[rowIndex][field] = e.target.value;
//     }
//     setRows(updatedRows);
//   };

//   const handleAddRow = () => {
//     setRows([
//       ...rows,
//       {
//         registerName: "",
//         offset: "",
//         readWrite: "",
//         fields: [""],
//         defaultValue: [""],
//         resetValue: [""],
//         description: "",
//       },
//     ]);
//   };

//   const handleAddField = (rowIndex) => {
//     const updatedRows = [...rows];
//     updatedRows[rowIndex].fields.push("");
//     updatedRows[rowIndex].defaultValue.push("");
//     updatedRows[rowIndex].resetValue.push("");
//     setRows(updatedRows);
//   };

//   const handleDownload = () => {
//     const data = rows.flatMap((row) => {
//       const maxFieldsLength = Math.max(
//         row.fields.length,
//         row.defaultValue.length,
//         row.resetValue.length
//       );
//       return Array.from({ length: maxFieldsLength }).map((_, i) => ({
//         "Register Name": row.registerName,
//         Offset: row.offset,
//         "Read/Write": row.readWrite,
//         Fields: row.fields[i] || "",
//         "Default Value": row.defaultValue[i] || "",
//         "Reset Value": row.resetValue[i] || "",
//         Description: row.description,
//       }));
//     });

//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//     XLSX.writeFile(wb, "table_data.xlsx");
//   };

//   return (
//     <div className="p-6 mt-16 bg-gray-50 shadow-lg rounded-lg">
//       <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
//         <thead className="bg-gray-100">
//           <tr>
//             {[
//               "Register Name",
//               "Offset",
//               "Read/Write",
//               "Fields",
//               "Default Value",
//               "Reset Value",
//               "Add Field",
//               "Description",
//             ].map((header) => (
//               <th
//                 key={header}
//                 className="border px-4 py-2 text-left text-gray-600 font-medium"
//               >
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, rowIndex) => (
//             <tr key={rowIndex} className="even:bg-gray-50">
//               <td className="border px-4 py-2">
//                 <input
//                   type="text"
//                   value={row.registerName}
//                   onChange={(e) =>
//                     handleInputChange(e, rowIndex, "registerName")
//                   }
//                   className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </td>
//               <td className="border px-4 py-2">
//                 <input
//                   type="text"
//                   value={row.offset}
//                   onChange={(e) => handleInputChange(e, rowIndex, "offset")}
//                   className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </td>
//               <td className="border px-4 py-2">
//                 <input
//                   type="text"
//                   value={row.readWrite}
//                   onChange={(e) => handleInputChange(e, rowIndex, "readWrite")}
//                   className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </td>
//               <td className="border px-4 py-2">
//                 {row.fields.map((field, fieldIndex) => (
//                   <div
//                     key={fieldIndex}
//                     className="flex items-center space-x-2 mb-1"
//                   >
//                     <input
//                       type="text"
//                       value={field}
//                       onChange={(e) =>
//                         handleInputChange(e, rowIndex, "fields", fieldIndex)
//                       }
//                       className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                 ))}
//               </td>
//               <td className="border px-4 py-2">
//                 {row.defaultValue.map((defaultValue, defaultIndex) => (
//                   <div key={defaultIndex} className="mb-1">
//                     <input
//                       type="text"
//                       value={defaultValue}
//                       onChange={(e) =>
//                         handleInputChange(
//                           e,
//                           rowIndex,
//                           "defaultValue",
//                           defaultIndex
//                         )
//                       }
//                       className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                 ))}
//               </td>
//               <td className="border px-4 py-2">
//                 {row.resetValue.map((resetValue, resetIndex) => (
//                   <div key={resetIndex} className="mb-1">
//                     <input
//                       type="text"
//                       value={resetValue}
//                       onChange={(e) =>
//                         handleInputChange(e, rowIndex, "resetValue", resetIndex)
//                       }
//                       className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                 ))}
//               </td>
//               <td className="border px-4 py-2 text-center">
//                 <button
//                   onClick={() => handleAddField(rowIndex)}
//                   className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                   Add Field
//                 </button>
//               </td>
//               <td className="border px-4 py-2">
//                 <textarea
//                   value={row.description}
//                   onChange={(e) =>
//                     handleInputChange(e, rowIndex, "description")
//                   }
//                   className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="flex justify-center mt-6 gap-4">
//         <button
//           onClick={handleAddRow}
//           className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Add Row
//         </button>
//         <button
//           onClick={handleDownload}
//           className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           Download as Excel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InputField;

import React, { useState } from "react";
import * as XLSX from "xlsx";

const InputField = ({ onSubmit }) => {
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

  const handleAddField = (rowIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].fields.push("");
    updatedRows[rowIndex].defaultValue.push("");
    updatedRows[rowIndex].resetValue.push("");
    setRows(updatedRows);
  };

  // const handleDownload = () => {
  //   const data = rows.flatMap((row) => {
  //     const maxFieldsLength = Math.max(
  //       row.fields.length,
  //       row.defaultValue.length,
  //       row.resetValue.length
  //     );
  //     return Array.from({ length: maxFieldsLength }).map((_, i) => ({
  //       "Register Name": row.registerName,
  //       Offset: row.offset,
  //       "Read/Write": row.readWrite,
  //       Fields: row.fields[i] || "",
  //       "Default value": row.defaultValue[i] || "",
  //       "Reset value": row.resetValue[i] || "",
  //       Description: row.description,
  //     }));
  //   });

  //   const ws = XLSX.utils.json_to_sheet(data);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  //   // Set the filename as 'register_definitions.xlsx'
  //   XLSX.writeFile(wb, "register_definitions.xlsx");
  // };

  const handleDownload = () => {
    const data = rows.flatMap((row) => {
      return row.fields.map((field, index) => ({
        "Register Name": index === 0 ? row.registerName : "", // Merge Register Name
        Offset: index === 0 ? row.offset : "", // Merge Offset
        "Read/Write": index === 0 ? row.readWrite : "", // Merge Read/Write
        Fields: field || "",
        "Default value": row.defaultValue[index] || "",
        "Reset value": row.resetValue[index] || "",
        Description: index === 0 ? row.description : "", // Merge Description
      }));
    });

    const ws = XLSX.utils.json_to_sheet(data);

    // Merge cells for Register Name, Offset, Read/Write, and Description
    const merges = [];
    let startRow = 1; // Start after the header row
    rows.forEach((row) => {
      const endRow = startRow + row.fields.length - 1;
      if (row.fields.length > 1) {
        merges.push(
          { s: { r: startRow, c: 0 }, e: { r: endRow, c: 0 } }, // Merge "Register Name"
          { s: { r: startRow, c: 1 }, e: { r: endRow, c: 1 } }, // Merge "Offset"
          { s: { r: startRow, c: 2 }, e: { r: endRow, c: 2 } }, // Merge "Read/Write"
          { s: { r: startRow, c: 6 }, e: { r: endRow, c: 6 } } // Merge "Description"
        );
      }
      startRow = endRow + 1;
    });

    ws["!merges"] = merges;
    // Apply styles to align merged cells to top-left
    Object.keys(ws).forEach((cell) => {
      if (cell[0] === "!") return; // Skip metadata
      ws[cell].s = {
        alignment: {
          vertical: "top", // Align to top
          horizontal: "left", // Align to left
        },
      };
    });

    // Apply column widths (optional for better formatting)
    ws["!cols"] = [
      { wch: 20 }, // Register Name
      { wch: 10 }, // Offset
      { wch: 10 }, // Read/Write
      { wch: 25 }, // Fields
      { wch: 15 }, // Default Value
      { wch: 15 }, // Reset Value
      { wch: 100 }, // Description
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "register_definitions.xlsx");
  };

  const handleSubmit = () => {
    console.log("rows:", rows);
    onSubmit(rows);
  };

  return (
    <div className="p-6 mt-16 bg-gray-50 shadow-lg rounded-lg">
      <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
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
            ].map((header) => (
              <th
                key={header}
                className="border px-4 py-2 text-left text-gray-600 font-medium"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-gray-50">
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={row.registerName}
                  onChange={(e) =>
                    handleInputChange(e, rowIndex, "registerName")
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={row.offset}
                  onChange={(e) => handleInputChange(e, rowIndex, "offset")}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={row.readWrite}
                  onChange={(e) => handleInputChange(e, rowIndex, "readWrite")}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
              <td className="border px-4 py-2">
                {row.fields.map((field, fieldIndex) => (
                  <div
                    key={fieldIndex}
                    className="flex items-center space-x-2 mb-1"
                  >
                    <input
                      type="text"
                      value={field}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, "fields", fieldIndex)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </td>
              <td className="border px-4 py-2">
                {row.defaultValue.map((defaultValue, defaultIndex) => (
                  <div key={defaultIndex} className="mb-1">
                    <input
                      type="text"
                      value={defaultValue}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          rowIndex,
                          "defaultValue",
                          defaultIndex
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </td>
              <td className="border px-4 py-2">
                {row.resetValue.map((resetValue, resetIndex) => (
                  <div key={resetIndex} className="mb-1">
                    <input
                      type="text"
                      value={resetValue}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, "resetValue", resetIndex)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleAddField(rowIndex)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Field
                </button>
              </td>
              <td className="border px-4 py-2">
                <textarea
                  value={row.description}
                  onChange={(e) =>
                    handleInputChange(e, rowIndex, "description")
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={handleAddRow}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Row
        </button>
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Download as Excel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default InputField;
