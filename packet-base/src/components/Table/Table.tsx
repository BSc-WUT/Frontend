import { useTable } from "react-table";
import type { Column } from "react-table";

interface TableProps {
  data: Object[];
  columns: Column[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="rounded-xl overflow-auto">
      <table
        className="min-w-full rounded border-separate"
        {...getTableProps()}
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup, key) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={key}>
              {headerGroup.headers.map((column, key) => (
                <th
                  {...column.getHeaderProps()}
                  className="py-3 px-6 text-left font-medium text-gray-500 uppercase"
                  key={key}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-gray-900">
          {rows.map((row, key) => {
            prepareRow(row);

            return (
              <tr
                {...row.getRowProps()}
                className="hover:bg-gray-700"
                key={key}
              >
                {row.cells.map((cell, key) => (
                  <td
                    {...cell.getCellProps()}
                    className="py-4 px-6 whitespace-nowrap"
                    key={key}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
