import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useGenericQuery from "../../hooks/useGenericQuery";
import { getAllCharacters } from "../../services/api functions/apiCharacters";
import FullSpinner from "../ui/FullSpinner";
import Pagination from "../ui/Pagination";
import CharacterStats from "./CharacterStats";
import GridComp from "./GridComp";

function CharactersGrid() {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const { data: raw, isLoading } = useGenericQuery({
    queryKey: ["characters", query, page],
    queryFn: ({ signal }) => getAllCharacters({ page, name: query, signal }),
    queryOptions: {
      staleTime: 0,
    },
  });

  if (page < raw?.totalPages || (page === 1 && selected))
    queryClient.prefetchQuery({
      queryKey: ["characters", query, page + 1],
      queryFn: ({ signal }) =>
        getAllCharacters({ page: page + 1, name: query, signal }),
    });

  function handleBack() {
    setPage(1);
    setSelected(null);
  }

  function handleChange(e) {
    setQuery(e.target.value);
    setSelected(null);
    setPage(1);
  }

  function handleSelect(id) {
    setQuery("");
    setSelected(id);
    setPage(1);
  }

  return (
    <div className="relative aspect-square h-[20rem]">
      <div className="h-full rounded-t-lg bg-indigo-50 pb-7 dark:bg-gray-800">
        <header className="relative flex h-8 w-full items-center rounded-t-lg bg-indigo-700 dark:bg-blue-900">
          <input
            onChange={handleChange}
            value={query}
            placeholder="Search Character"
            className="mx-auto h-6 w-[70%] rounded-sm bg-gray-100 px-2 text-center outline-none dark:bg-gray-800"
          />
        </header>
        <div className="relative h-full border-4 border-t-0 border-indigo-700 dark:border-blue-900">
          {isLoading ? (
            <FullSpinner size="base" blur={false} />
          ) : selected ? (
            <CharacterStats id={selected} back={handleBack} page={page} />
          ) : (
            <GridComp data={raw.data} onClick={handleSelect} />
          )}
        </div>
      </div>
      <footer className="absolute flex w-full items-center justify-center rounded-b-lg bg-indigo-700 py-1 dark:bg-blue-900">
        <Pagination
          currentPage={page}
          setCurrentPage={setPage}
          lastPage={!selected ? !isLoading && raw.totalPages : 2}
        />
      </footer>
    </div>
  );
}

export default CharactersGrid;
