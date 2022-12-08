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
import { useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleRight,
  HiChevronDoubleLeft,
  HiExternalLink,
  HiChevronUp,
  HiChevronDown,
} from "react-icons/hi";
import { SubgraphStatusLabel } from "./SubgraphStatusLabel";
import { useGetChainData } from "../../hooks/useGetChainData";
import RemoveButton from "./RemoveButton";
import { getDataForChain } from "../../utils/functions";

type GraphRow = {
  name: string;
  indexer: string;
  chainId: number;
  status?: any;
  removeButton?: any;
  subRows?: GraphRow[];
};
type Props = {
  inputs: GraphRow[];
};

export function SubgraphTable({ inputs: tableData }: Props) {
  const columnHelper = createColumnHelper<GraphRow>();
  const columns = [
    columnHelper.accessor("name", {
      header: () => <span>Title</span>,
      cell: (info) => (
        <span className="text-lg capitalize">{info.getValue()}</span>
      ),
      enableSorting: true,
      enableGrouping: false,
    }),
    columnHelper.accessor("chainId", {
      header: () => <span>Chain</span>,
      cell: (info) => <ChainIdToLink chainId={info.getValue()} />,
      enableSorting: true,
      enableGrouping: false,
    }),
    columnHelper.accessor("indexer", {
      header: () => <span>GraphQL</span>,
      cell: (info) => (
        // 2 urls buttons inline next to each other
        <div className={"flex flex-row gap-2"}>
          <a href={info.getValue()} target="_blank" rel="noopener noreferrer">
            <button className=" text-secondary flex items-center space-x-1 underline-offset-2 hover:decoration-2 hover:underline font-semibold">
              <HiExternalLink />
              <div>GraphQL</div>
            </button>
          </a>
        </div>
      ),
      enableGrouping: false,
    }),
    columnHelper.accessor("status", {
      header: () => "Status",
      cell: (info) => (
        <SubgraphStatusLabel
          chainId={info.row.getValue("chainId")}
          indexer={info.row.getValue("indexer")}
        />
      ),
      enableGrouping: false,
    }),
    columnHelper.accessor("removeButton", {
      header: () => "Remove",
      cell: (info) => <RemoveButton rowId={info.row.index} />,
      enableGrouping: false,
    }),
  ];

  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: tableData,
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
                          ? "cursor-pointer select-none flex items-center"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}{" "}
                      {{
                        asc: <HiChevronUp />,
                        desc: <HiChevronDown />,
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
      {
        // Paginationation shown if there are more than 10 rows
        table.getRowModel().rows.length > 10 && (
          <>
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
          </>
        )
      }
    </div>
  );
}

export const ChainIdToLink = (props: { chainId: number }) => {
  const chainId = props.chainId;
  const chainList = useGetChainData();
  const chainData = chainList.data && getDataForChain(chainList.data, chainId);

  return (
    <a
      href={chainData?.explorers[0].url ?? ""}
      target="_blank"
      rel="noreferrer"
    >
      <button className=" text-secondary flex items-center space-x-1 underline-offset-2 hover:decoration-2 hover:underline font-semibold">
        <HiExternalLink />
        <div>{chainData?.name}</div>
      </button>
    </a>
  );
};
