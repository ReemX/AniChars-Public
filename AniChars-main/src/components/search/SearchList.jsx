import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { cn, scrollbar } from "../../utils/helpers";

function SearchList({ children, resourceName, query }) {
  const link = `/search/${query}?type=${
    resourceName === "Series" ? "series" : "character"
  }`;

  return (
    <>
      <h3 className="font-semibold text-indigo-700 dark:text-blue-600">
        {resourceName}:
      </h3>
      <ul
        className={cn(
          "h-[6rem] divide-y overflow-y-auto rounded-t-md border-2 border-b-0 border-indigo-700 p-2 dark:divide-gray-600 dark:border-blue-700 fullext:h-auto semiext:h-[12rem]",
          scrollbar({ thick: false, roundThumb: true, roundTrack: true }),
        )}
      >
        {children}
      </ul>

      <Link
        className="flex h-8 cursor-pointer items-center justify-between rounded-b-md bg-indigo-700 px-2 decoration-gray-200 hover:underline dark:bg-blue-700"
        to={link}
        reloadDocument={true}
      >
        <h1 className="text-gray-200 dark:text-gray-400">
          Click here to see more {resourceName.toLowerCase()}...
        </h1>
        <HiArrowLongRight className="text-3xl text-gray-200 dark:text-gray-400" />
      </Link>
    </>
  );
}

export default SearchList;
