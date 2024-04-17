import { Link } from "react-router-dom";

function SearchListItem({ children, to }) {
  return (
    <Link
      to={to}
      className="flex cursor-pointer items-center gap-6 overflow-hidden py-2 pr-2 transition-all first:pt-0 last:pb-0 hover:scale-[1.02] hover:rounded-md hover:bg-gray-300 dark:hover:bg-gray-800"
    >
      {children}
    </Link>
  );
}

export default SearchListItem;
