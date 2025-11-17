import { Trash2, Edit2, CheckCircle2, XCircle, Play, Check } from "lucide-react";
"use client";
import  { useMemo, useState, FC } from "react";
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
  Input,
} from "@chakra-ui/react";
import { TABLE_COMPONENT_PROPS } from "@/types";
import { useDebounce } from "@/hooks/use-debounce";
import { useTheme } from "next-themes";
import { flattenRowData } from "@/lib/utils";



const JobsModuleTableComponent:FC<TABLE_COMPONENT_PROPS> = ({tableBody, tableHeaders, search, endpoint,components,container_id,id_type, tableName }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);
  const theme = useTheme();
  console.log(tableHeaders)

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  // Memoize headers to avoid new references on each render
  const columnHelper = createColumnHelper<typeof tableBody[0]>();
  const stableHeaders = useMemo(
    () => tableHeaders ?? [],
    [JSON.stringify(tableHeaders)]
  );
   //  Memoize body to avoid unnecessary re-renders
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
        return (search?.some((field) =>{
          let modified_field = field==="job_type" ? "job" : field
          return  String(row?.[modified_field] ?? "")
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

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setSearchQuery(e.target.value)
    }
  return (
    <article className={`bg-white dark:bg-[#2D3748] rounded-lg p-[1.5%] shadow-md my-[1%]`}>
      {search!.length > 0 && (
          <>


          <div className="md:w-[60%] p-2">
            <div className='w-full md:mx-[2%]'>
              <Input placeholder={'Search by Job or Workr Name'} value={searchQuery}
                onChange={handleChange}
              className={`w-full rounded-lg max-w-md dark:bg-[#2D3748] dark:text-white`}               />
            </div>
            </div>
            <div className="flex justify-between items-center p-2">
            
            </div>


          </>
        )}

      <TableContainer>
        <Table variant='striped' colorScheme={theme?.theme === 'dark' ? 'whiteAlpha' : 'blue'} _dark={{ bg: '#122031' }}>
          <TableCaption>{tableName}</TableCaption>
          <Thead className={`bg-gray-100`}>
            {tableDataList?.getHeaderGroups()?.map((headerGroup) => (
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
                {components!.length > 0 && <Th>Actions</Th>}
              </Tr>
            ))}
          </Thead>
          {/* <Tbody className={`md:text-[0.4em]`}>
              {stableBody.length === 0 ? (
                <Tr>
                  <Td
                    colSpan={columnsList.length + (components!.length > 0 ? 1 : 0)}
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

                        return (
                          <Td key={cell.id} className="capitalize">
                            {`${value ?? "-"}`}
                          </Td>
                        );
                      })}


                      {components!.length > 0 && (
                        <Td>
                          <div
                            id={container_id}
                            className="flex flex-wrap justify-center items-center gap-[1%]"
                          >
                            {components?.map((Component, idx) => (
                              <Component
                                key={idx}
                                endpoint={endpoint}
                                id_type={id_type}
                                item={row.original}

                              />
                            ))}
                          </div>
                        </Td>
                      )}
                    </Tr>
                  )
                })
              )}
            </Tbody> */}
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
    </article>
  )
}

export default JobsModuleTableComponent;