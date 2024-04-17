import { useEffect, useRef, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import SearchModal from "./SearchModal";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { AnimatePresence } from "framer-motion";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchField = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  function clearSearchBar() {
    setIsSearching(false);
    setQuery("");
    searchField.current.blur();
  }

  useEffect(() => {
    clearSearchBar();
  }, [location.pathname]);

  function handleSearch(e) {
    e.preventDefault();
    if (isSearching) {
      navigate(
        `/search/${query.length === 0 ? "Naruto" : query}?type=character`,
      );
      return;
    }

    setIsSearching(true);
  }

  function handleChange(e) {
    setIsSearching(false);
    setQuery(e.target.value);
  }

  return (
    <form
      className="relative mx-20 flex h-8 flex-grow justify-center"
      onSubmit={handleSearch}
    >
      <input
        className="max-w-[30rem] flex-grow rounded-l-full bg-gray-200/40 pl-2 text-gray-100 outline-none transition-colors selection:bg-indigo-700 placeholder:text-gray-300 hover:bg-gray-200/50 focus:bg-gray-200/50 dark:bg-gray-600/40 dark:text-gray-400 dark:selection:bg-blue-900 dark:placeholder:text-gray-500 dark:hover:bg-gray-600/50 dark:focus:bg-gray-600/50"
        value={query}
        onChange={handleChange}
        ref={searchField}
        placeholder="Search favorite series or character here!"
      />
      <Button className="group w-14 flex-shrink-0 rounded-r-full bg-indigo-700 dark:bg-blue-950">
        <HiMagnifyingGlass className="m-auto text-xl text-gray-200 transition-transform group-hover:scale-110 dark:text-gray-400" />
      </Button>
      <AnimatePresence>
        {isSearching && (
          <SearchModal query={query} handleClose={clearSearchBar} />
        )}
      </AnimatePresence>
    </form>
  );
}

export default SearchBar;
