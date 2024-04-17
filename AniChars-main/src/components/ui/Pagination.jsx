import { HiArrowLeftCircle, HiArrowRightCircle } from "react-icons/hi2";
import { cn } from "../../utils/helpers";

function Pagination({
  currentPage = 1,
  lastPage,
  setCurrentPage,
  bgColor = "bg-gray-100",
  darkBgColor = "dark:bg-gray-800",
}) {
  return (
    <div
      className={cn(
        "flex w-fit select-none items-center gap-2 rounded-lg px-2 py-2 shadow-md",
        bgColor,
        darkBgColor,
      )}
    >
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((c) => c - 1)}
        className="group disabled:cursor-default"
      >
        <HiArrowLeftCircle className="text-3xl text-indigo-700 transition-all group-disabled:text-gray-600 hover:scale-110 group-disabled:hover:scale-100 dark:text-blue-900 group-disabled:dark:text-gray-500" />
      </button>
      <span className="w-8 border-x text-center text-xl font-semibold dark:border-x-gray-700 dark:text-gray-500">
        {currentPage}
      </span>
      <button
        disabled={currentPage === lastPage || !lastPage}
        onClick={() => setCurrentPage((c) => c + 1)}
        className="group disabled:cursor-default"
      >
        <HiArrowRightCircle className="text-3xl text-indigo-700 transition-all group-disabled:text-gray-600 hover:scale-110 group-disabled:hover:scale-100 dark:text-blue-900 group-disabled:dark:text-gray-500" />
      </button>
    </div>
  );
}

export default Pagination;
