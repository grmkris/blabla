import {
  GroupingState,
  useReactTable,
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
  HiExternalLink,
  HiChevronUp,
  HiChevronDown,
  HiOutlineClipboard,
} from "react-icons/hi";
import { GrGroup, GrFormClose } from "react-icons/gr";
import { SubgraphStatusLabel } from "./SubgraphStatusLabel";
import { useGetChainData } from "../../hooks/useGetChainData";
import RemoveButton from "./RemoveButton";
import { base64Encode, getDataForChain } from "../../utils/functions";
import Link from "next/link";
import { copyToClipboard } from "../SubgraphsDashboard";
import EditButton from "./EditButton";
import Modal from "../Modal";
import { SubgraphForm } from "../../types/types";

type GraphRow = {
  name: string;
  indexer: string;
  chainId: number;
  status?: string;
  playground?: string;
  manage?: string;
  tag: string;
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
    columnHelper.accessor("tag", {
      header: () => <span>Tag</span>,
      cell: (info) => (
        <span className="text-lg capitalize">{info.getValue()}</span>
      ),
      enableSorting: true,
      enableGrouping: true,
    }),
    columnHelper.accessor("chainId", {
      header: () => <span>Chain</span>,
      cell: (info) => <ChainIdToLink chainId={info.getValue()} />,
      enableSorting: true,
      enableGrouping: false,
    }),
    columnHelper.accessor("indexer", {
      header: () => <span>GraphQL</span>,
      cell: (cell) => (
        <div className={"flex items-center"}>
          <a href={cell.getValue()} target="_blank" rel="noopener noreferrer">
            <button className="text_link">
              <HiExternalLink />
              <div>GraphQL</div>
            </button>
          </a>
        </div>
      ),
      enableGrouping: false,
    }),
    columnHelper.accessor("playground", {
      header: () => "Playground",
      cell: (cell) => (
        <Link
          href={`/subgraph/${base64Encode(cell.row.getValue("indexer"))}`}
          className="btn-outline btn-secondary btn-sm btn"
        >
          <div>Playground</div>
        </Link>
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
    columnHelper.accessor("manage", {
      header: () => "",
      cell: (info) => (
        <div className={"flex flex-row space-x-2"}>
          <button
            className="text_link btn-primary btn-ghost btn-sm btn font-bold"
            onClick={async () => {
              await copyToClipboard(info.row.getValue("indexer"));
            }}
          >
            <HiOutlineClipboard />
            <div>Copy URL</div>
          </button>

          <EditButton
            rowId={info.row.index}
            setOpenModal={setOpenModal}
            setModalData={setModalData}
          />
          <RemoveButton rowId={info.row.index} />
        </div>
      ),
      enableGrouping: false,
    }),
  ];

  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<SubgraphForm>();

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
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
  });

  return (
    <div className="w-full overflow-x-auto">
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
                        {header.column.getIsGrouped() ? (
                          <GrFormClose className="mr-2 h-4 w-4" />
                        ) : (
                          <GrGroup className="mr-2 h-4 w-4" />
                        )}
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
                {row.getVisibleCells().map((cell, index) => {
                  return (
                    <td
                      className={`${
                        cell.getIsGrouped()
                          ? "bg-secondary font-semibold text-white"
                          : ""
                      }`}
                      key={index}
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

      <Modal formData={modalData!} open={openModal} setOpen={setOpenModal} />
    </div>
  );
}

export const ChainIdToLink = (props: { chainId: number }) => {
  const chainId = props.chainId;
  const chainList = useGetChainData();
  const chainData = chainList.data && getDataForChain(chainList.data, chainId);

  return (
    <a
      href={chainData?.explorers?.[0]?.url ?? ""}
      target="_blank"
      rel="noreferrer"
    >
      <button className="text_link">
        <HiExternalLink />
        <div>{chainData?.name}</div>
      </button>
    </a>
  );
};
