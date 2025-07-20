import React from "react";
import { TableProps } from "@/lib/types";

const CustomTable: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="px-4 w-[1088px] bg-white border rounded-lg shadow-md overflow-auto">
      <table className="w-full text-center ">
        <thead>
          <tr className="border-b text-[17px]">
            {columns.map((column, index) => (
              <th key={index} className="py-6 px-4 text-[17px]">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-4 px-4">
                  {column.render
                    ? column.render(row[column.accessor])
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
