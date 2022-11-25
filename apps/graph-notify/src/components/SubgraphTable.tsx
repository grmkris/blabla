import {
  GroupingState,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleRight,
  HiChevronDoubleLeft,
  HiExternalLink,
} from "react-icons/hi";
import GraphBlockColumn from "./GraphBlockColumn";

type GraphRow = {
  name: string;
  indexer: string;
  chainId: number;
  subRows?: GraphRow[];
};
type Props = {
  inputs: GraphRow[];
};

export default function SubgraphTable({ inputs: tableData }: Props) {
  const columnHelper = createColumnHelper<GraphRow>();

  const columns = [
    columnHelper.accessor("name", {
      header: () => <span>Title</span>,
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),

    columnHelper.accessor("chainId", {
      header: () => "latestBlock",
      cell: (info) => (
        <GraphBlockColumn
          columnType="latestBlock"
          chainId={info.getValue()}
          indexer={info.row.getValue("indexer")}
        />
      ),
    }),
    columnHelper.accessor("chainId", {
      header: () => "subgraphBlock",
      cell: (info) => (
        <GraphBlockColumn
          columnType="subgraphBlock"
          chainId={info.getValue()}
          indexer={info.row.getValue("indexer")}
        />
      ),
      enableGrouping: false, //THIS ENABLES GROUPING ON COLUMN
    }),
    columnHelper.accessor("chainId", {
      header: () => "Blocks behind",
      cell: (info) => (
        <GraphBlockColumn
          columnType="blocksBehind"
          chainId={info.getValue()}
          indexer={info.row.getValue("indexer")}
        />
      ),
    }),
    columnHelper.accessor("indexer", {
      header: () => <span>Link</span>,
      cell: (info) => (
        <Link href={info.getValue()} target="_blank" rel="noopener noreferrer">
          <button className="btn btn-info btn-outline gap-2 inline-flex">
            <HiExternalLink />
            Link
          </button>
        </Link>
      ),
    }),
    columnHelper.accessor("indexer", {
      header: () => <span>Link</span>,
      cell: (info) => "info.getValue()",
    }),
  ];

  const [data, setData] = useState(tableData);

  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      grouping,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
  });

  return (
    <div className="overflow-x-auto w-full">
      <div className="h-2" />
      <table className="table w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div className="flex">
                    {header.column.getCanGroup() ? (
                      // If the header can be grouped, let's add a toggle
                      <button
                        {...{
                          onClick: header.column.getToggleGroupingHandler(),
                          style: {
                            cursor: "pointer",
                          },
                        }}
                      >
                        {header.column.getIsGrouped()
                          ? `🛑(${header.column.getGroupedIndex()}) `
                          : `👊 `}
                      </button>
                    ) : null}
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}{" "}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      {...{
                        key: cell.id,
                        style: {
                          background: cell.getIsGrouped()
                            ? "#0aff0082"
                            : cell.getIsAggregated()
                            ? "#ffa50078"
                            : cell.getIsPlaceholder()
                            ? "#ff000042"
                            : "white",
                        },
                      }}
                    >
                      {cell.getIsGrouped() ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <button
                            {...{
                              onClick: row.getToggleExpandedHandler(),
                              style: {
                                cursor: row.getCanExpand()
                                  ? "pointer"
                                  : "normal",
                              },
                            }}
                          >
                            {row.getIsExpanded() ? "👇" : "👉"}{" "}
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}{" "}
                            ({row.subRows.length})
                          </button>
                        </>
                      ) : cell.getIsAggregated() ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        flexRender(
                          cell.column.columnDef.aggregatedCell ??
                            cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex justify-between items-center gap-2">
        <div className="flex space-x-4">
          <button
            className="border rounded p-1 disabled:text-slate-500"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <HiChevronDoubleLeft />
          </button>
          <button
            className="border rounded p-1 disabled:text-slate-500"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <HiChevronLeft />
          </button>
          <button
            className="border rounded p-1 disabled:text-slate-500"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <HiChevronRight />
          </button>
          <button
            className="border rounded p-1 disabled:text-slate-500"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <HiChevronDoubleRight />
          </button>
        </div>
        <div>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}
