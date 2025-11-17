"use client";
import React, { useMemo, useState, } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table, Thead, Tbody, Tr,
  Th, Td, TableCaption, TableContainer,
} from "@chakra-ui/react";
import type { TABLE_COMPONENT_PROPS } from "@/types";
import { useTheme } from "next-themes";
import { dateToExactReadbleTime, flattenRowData } from "@/lib/utils";
import SearchBarComponent from "@/components/dynamic-renderer/search-bar";
import { useDebounce } from "@/hooks/use-debounce";
import StatusBadge from "@/components/modules/jobs/_elements/_helper/status-badge";

const TableComponent: React.FC<TABLE_COMPONENT_PROPS> = ({
  endpoint,
  tableHeaders,
  tableBody,
  components = [],
  tableName,
  container_id,
  id_type, search
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);
  const theme = useTheme();

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  // 🔒 Log only when endpoint changes
  // useEffect(() => {
  //   console.log(endpoint);
  // }, [endpoint]);

  const columnHelper = createColumnHelper<typeof tableBody[0]>();

  // 🔒 Memoize headers to avoid new references on each render
  const stableHeaders = useMemo(
    () => tableHeaders ?? [],
    [JSON.stringify(tableHeaders)]
  );

  // 🔒 Memoize body to avoid unnecessary re-renders
  const stableBody = useMemo(
    () => tableBody ?? [],
    [JSON.stringify(tableBody)]
  );

  // 🔒 Build columns only when headers change
  const columnsList = useMemo(() => {
    return stableHeaders.map((columnHeader: any) =>
      columnHelper.accessor(columnHeader.key, {
        id: columnHeader.key,
        header: columnHeader.label, // ⚡ no inline JSX → stable
        cell: (info) => info.getValue(),
        enableSorting: true,
      })
    );
  }, [stableHeaders]);

  const processedBody = useMemo(() => {

    const flatData = stableBody.map((row: any) => flattenRowData(row));

    if (!debouncedSearch || search?.length === 0) return flatData;

    const loweredQuery = debouncedSearch.toLowerCase();
    const filteredData = flatData.filter((row: any) => {
      return (search?.some((field) => {
        let modified_field = field === "job_type" ? "job" : field
        return String(row?.[modified_field] ?? "")
          .toLowerCase()
          .includes(loweredQuery)
      }
      ))
    }
    );
    return filteredData
  }, [stableBody, stableHeaders, debouncedSearch, search]);

  // 🔒 React Table setup with stable refs
  const tableDataList = useReactTable({
    data: processedBody,
    columns: columnsList,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    state: { sorting, pagination },


  });

  return (
    <article className="text-[4vw] md:text-[2.2vw]">
      <div className="w-full overflow-x-auto bg-white dark:bg-[#122031] rounded-lg max-w-full">
        {search!.length > 0 && (
          <>
            <div className="md:w-[60%] p-2">
              <SearchBarComponent
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                placeholder={`Search by ${search?.[0]?.split("_").join(" ")}`}
              />
            </div>
            <div className="flex justify-between items-center p-2">

            </div>
          </>
        )}

        <TableContainer className={`p-[1.5%]`}>
          <Table variant='simple' colorScheme={theme?.theme === 'dark' ? 'whiteAlpha' : 'gray'} _dark={{ bg: '#e2e2e2' }}>
            <TableCaption>{tableName}</TableCaption>
            <Thead>
              {tableDataList?.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id} className="cursor-pointer">
                  {headerGroup.headers.map((header) => (
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Th>
                  ))}
                  {components.length > 0 && <Th>Actions</Th>}
                </Tr>
              ))}
            </Thead>
            <Tbody className={`md:text-[0.4em]`}>
              {stableBody.length === 0 ? (
                <Tr>
                  <Td
                    colSpan={columnsList.length + (components.length > 0 ? 1 : 0)}
                    className="text-center text-red-500 py-4"
                  >
                    No data available
                  </Td>
                </Tr>
              ) : (
                tableDataList.getRowModel().rows.map((row) => {

                  return (
                    <Tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {

                        let value = cell.getValue();

                        if (typeof value === "string") {
                          value = value.replace(/_/g, " ");
                        }

                        // ✅ Detect and format ISO timestamps like "2025-10-30T11:53:05.417Z"
                        const isISOString =
                          typeof value === "string" &&
                          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value);

                        if (isISOString) {
                          const date = new Date(`${value}`);
                          if (!isNaN(date.getTime())) {
                            // Convert UTC → Local Time in readable format
                            value = dateToExactReadbleTime(`${value}`)
                            // value = date.toLocaleString("en-IN", {
                            //   day: "2-digit",
                            //   month: "short",
                            //   year: "numeric",
                            //   hour: "2-digit",
                            //   minute: "2-digit",
                            //   // second: "2-digit",
                            //   hour12: true,
                            // });
                          }
                        }

                        const isJobStatus = (endpoint==="jobs_allotment" && cell.column.id === "status");

                        return (
                          <Td key={cell.id} className="capitalize whitespace-normal break-words max-w-[15.0em]">
                            {
                              isJobStatus ? (<StatusBadge status={`${value}`} />) : (<>{`${value ?? "-"}`}</>)
                            }
                            
                          </Td>
                        );
                      })}


                      {components.length > 0 && (
                        <Td className="text-left">
                          <div
                            id={container_id}
                            className="flex flex-wrap justify-start items-center gap-[1%]w-full"
                          >
                            {components?.map((Component, idx) => (
                              <Component
                                key={idx}
                                endpoint={endpoint}
                                id_type={id_type}
                                item={row.original}
                                status={row.original?.status}

                              />
                            ))}
                          </div>
                        </Td>
                      )}
                    </Tr>
                  )
                })
              )}
            </Tbody>
          </Table>
        </TableContainer>
        {/* ✅ Pagination Controls */}
        <div className="flex justify-between items-center p-2 md:text-[0.4em]">
          <div className="flex gap-2">
            <button
              onClick={() => tableDataList.previousPage()}
              disabled={!tableDataList.getCanPreviousPage()}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={() => tableDataList.nextPage()}
              disabled={!tableDataList.getCanNextPage()}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <span>
            Page{" "}
            <strong>
              {tableDataList.getState().pagination.pageIndex + 1} of{" "}
              {tableDataList.getPageCount()}
            </strong>
          </span>

          <select
            value={tableDataList.getState().pagination.pageSize}
            onChange={(e) => tableDataList.setPageSize(Number(e.target.value))}
            className="border rounded p-1"
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </article>
  );
};

export default TableComponent;
