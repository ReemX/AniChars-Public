import SearchList from "./SearchList";
import CharSearchItem from "./CharSearchItem";
import SeriesSearchItem from "./SeriesSearchItem";
import useGenericQuery from "../../hooks/useGenericQuery";
import { searchMixed } from "../../services/api functions/apiSearch";
import FullSpinner from "../ui/FullSpinner";
import { HiMiniXMark } from "react-icons/hi2";
import NotFound from "./NotFound";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

function SearchModal({ query, handleClose }) {
  const { data, isLoading } = useGenericQuery({
    queryKey: ["search_mixed", query],
    queryFn: () => searchMixed(query),
  });

  const isSeries = data?.series?.length > 0;
  const isCharacters = data?.characters?.length > 0;

  return (
    <>
      {createPortal(
        <div className="absolute inset-0" onClick={handleClose}></div>,
        document.body,
      )}
      <motion.div
        className="absolute top-[2.9rem] z-50 grid w-full max-w-[33.5rem] origin-top select-none rounded-md border border-gray-200 bg-gray-100 p-4 dark:border-blue-800 dark:bg-gray-700"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
      >
        {isLoading ? (
          <div className="h-5">
            <FullSpinner size="xs" />
          </div>
        ) : !isSeries && !isCharacters ? (
          <NotFound handleClose={handleClose} />
        ) : (
          <>
            <div className="flex justify-between">
              <h1 className="mb-4 text-xl font-semibold dark:text-gray-400">{`Search results for: "${query}"`}</h1>
              <HiMiniXMark
                className="cursor-pointer text-3xl dark:text-gray-400"
                onClick={handleClose}
              />
            </div>
            {isCharacters && (
              <SearchList resourceName="Characters" query={query}>
                {data.characters.map((char) => (
                  <CharSearchItem char={char} key={char.malId} />
                ))}
              </SearchList>
            )}
            {isSeries && (
              <SearchList resourceName={"Series"} query={query}>
                {data.series.map((series) => (
                  <SeriesSearchItem series={series} key={series.malId} />
                ))}
              </SearchList>
            )}
          </>
        )}
      </motion.div>
    </>
  );
}

export default SearchModal;
