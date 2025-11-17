import { useDebounce } from "@/hooks/use-debounce";
import  {  useMemo, useState } from "react";
import SearchBarComponent from "@/components/dynamic-renderer/search-bar";
import { flattenRowData } from "@/lib/utils";
import { CardComponentProps } from "@/types";
import dynamic from "next/dynamic";
import { USER_ENDPOINTS } from "@/data-handling/endpoints/server-endpoints";

const DynamicJobsCardComponent = dynamic(() => import('@/components/dynamic-renderer/card/_components/jobs-card'));
const DynamicCardComponent = dynamic(() => import('@/components/dynamic-renderer/card/_components/card-component'));

const CardComponent = ({ tableBody, cardHeaders, search, endpoint, components,id_type }: CardComponentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);
const searchPlaceHolder = useMemo(()=>{
  const placeholders = search?.join(", ");
  return `Search by ${placeholders?.split("_").join(" ")}`;
},[search])
  // Pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 6,
  });

  const processedData = useMemo(() => {
    if (search.length === 0) return tableBody;
    if (debouncedSearch) {
      return tableBody.map((item)=>flattenRowData(item))?.filter((item) =>
        search?.some((key) =>
          String(item?.[key] ?? "")
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())
        )
      );
    }
    return tableBody;
  }, [debouncedSearch, tableBody, search]);

  // Paginated data
  const paginatedData = useMemo(() => {
    const start = pagination?.pageIndex * pagination.pageSize;
    const end = start + pagination?.pageSize;
    return processedData?.slice(start, end);
  }, [processedData, pagination]);

  return (
    <article className="bg-white dark:bg-[#122031] p-[1.5%] rounded-lg">
      <div className={`flex justify-between gap-[2%]`}>
      {search!.length > 0 && (
        <div className="md:w-[50%] p-2">
          <SearchBarComponent
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            placeholder={`${searchPlaceHolder}`}
          />
        </div>
      )}
        {/* Pagination Controls */}
        {processedData?.length > pagination.pageSize && (
        <div className="flex justify-between items-center mt-4 md:w-[30%]">
          <div className="flex gap-2">
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: Math.max(prev.pageIndex - 1, 0),
                }))
              }
              disabled={pagination.pageIndex === 0}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: Math.min(
                    prev.pageIndex + 1,
                    Math.ceil(processedData.length / prev.pageSize) - 1
                  ),
                }))
              }
              disabled={
                pagination.pageIndex >=
                Math.ceil(processedData.length / pagination.pageSize) - 1
              }
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <span>
            Page <strong>{pagination.pageIndex + 1}</strong> of{" "}
            {Math.max(1, Math.ceil(processedData.length / pagination.pageSize))}
          </span>

          <select
            value={pagination.pageSize}
            onChange={(e) =>
              setPagination({ pageIndex: 0, pageSize: Number(e.target.value) })
            }
            className="border rounded p-1"
          >
            {[6, 12, 18, 24].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      )}
      </div>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedData?.map((rowObj,) => {
          const row = flattenRowData(rowObj);

          return (endpoint === USER_ENDPOINTS.JOBS_ALLOTMENT) ?
            (
              <DynamicJobsCardComponent key={row?._id} job={row} endpoint={endpoint} />
            )
            : (
              <DynamicCardComponent
                endpoint={endpoint}
                search={search}
                tableBody={tableBody}
                key={row?._id}
                row={row}
                cardHeaders={cardHeaders}
                components={components}
                id_type={id_type}

              />
            )
        })}
      </section>
    </article>
  );
};

export default CardComponent;
