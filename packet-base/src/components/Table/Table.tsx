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
    <div className="rounded-xl overflow-hidden">
      <table
        className="min-w-full rounded border-separate"
        {...getTableProps()}
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="py-3 px-6 text-left font-medium text-gray-500 uppercase"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-gray-900">
          {rows.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-700">
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="py-4 px-6 whitespace-nowrap"
                  >
                    {cell.render("Cell", { a: "test" })}
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
