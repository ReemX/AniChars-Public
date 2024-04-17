import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CharSearchItem from "../components/search/CharSearchItem";
import SeriesSearchItem from "../components/search/SeriesSearchItem";
import FullSpinner from "../components/ui/FullSpinner";
import Pagination from "../components/ui/Pagination";
import ToggleButton from "../components/ui/ToggleButton";
import useGenericQuery from "../hooks/useGenericQuery";
import { searchSpecific } from "../services/api functions/apiSearch";
import { cn, scrollbar } from "../utils/helpers";

function Search() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(+searchParams.get("page") || 1);
  const { query } = useParams();
  const [isCharacter, setIsCharacter] = useState(
    searchParams.get("type") === "character",
  );
  const resource = isCharacter ? "character" : "series";

  const { data: raw, isLoading } = useGenericQuery({
    queryKey: [`search_${resource}`, query, page],
    queryFn: () => searchSpecific({ resource, query, page }),
  });

  if (raw?.data.length > 0 && page < raw?.pagination?.last_visible_page) {
    queryClient.prefetchQuery({
      queryKey: [`search_${resource}`, query, page + 1],
      queryFn: () => searchSpecific({ resource, query, page: page + 1 }),
    });
  }

  if (raw?.data.length > 0 && page > 1) {
    queryClient.prefetchQuery({
      queryKey: [`search_${resource}`, query, page - 1],
      queryFn: () => searchSpecific({ resource, query, page: page - 1 }),
    });
  }

  const { data, pagination } = raw || {};

  useEffect(() => {
    searchParams.set("page", page);
    searchParams.set("type", resource);
    setSearchParams(searchParams);
  }, [page, searchParams, setSearchParams, resource]);

  useEffect(() => {
    if (!isLoading && data.length === 0 && page !== 1) {
      setPage(1);
    }
  }, [isLoading, data, page]);

  return (
    <div className="relative mx-auto h-full max-w-[60rem] overflow-hidden border-x-2 px-[5rem] dark:border-gray-800">
      <header className="flex justify-end rounded-md bg-indigo-400 px-5 text-white dark:bg-blue-700 dark:text-gray-300">
        <h2 className="mr-10 border-r-2 border-indigo-500 pr-16 dark:border-blue-800">{`Search Results for: "${query}"`}</h2>
        <ToggleButton
          initialValue={isCharacter}
          setFn={setIsCharacter}
          lables_style="text-white"
          gap="gap-2"
        />
      </header>
      {isLoading ? (
        <FullSpinner blur={false} size="lg" />
      ) : (
        <>
          {data.length === 0 ? (
            <p className="mt-8 text-center font-nova-square text-3xl font-bold uppercase text-indigo-700">
              No Results Found!
            </p>
          ) : (
            <section
              className={cn(
                "h-full overflow-y-auto pb-8",
                scrollbar({ roundThumb: false }),
              )}
            >
              <ul className="divide-y p-6 pb-0 dark:divide-gray-800">
                {isCharacter
                  ? data.map((char) => (
                      <CharSearchItem char={char} key={char.malId} />
                    ))
                  : data.map((series) => (
                      <SeriesSearchItem series={series} key={series.malId} />
                    ))}
              </ul>
              <div className="mr-5 mt-4 flex justify-end">
                <Pagination
                  setCurrentPage={setPage}
                  currentPage={pagination.current_page}
                  lastPage={pagination.last_visible_page}
                  bgColor=""
                />
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default Search;
