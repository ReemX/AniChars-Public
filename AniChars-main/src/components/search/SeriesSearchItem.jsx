import { BiSolidMovie } from "react-icons/bi";
import SearchListItem from "./SearchListItem";

function SeriesSearchItem({ series }) {
  return (
    <SearchListItem to={`/series/${series.malId}`}>
      <img
        draggable="false"
        src={series.image}
        className="h-20 w-[3.5rem] rounded-md object-cover"
      />
      <div className="space-y-3">
        <h2 className="text-lg font-medium text-indigo-700 dark:text-blue-600">
          {series.title}
        </h2>
        <div className="flex gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {series.genres.join(", ")}
          </p>
          <span className="text-sm text-gray-500 dark:text-gray-400">|</span>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {series.stats.type} &#x2022; {series.stats.year}
          </p>
        </div>
      </div>
      <BiSolidMovie className="ml-auto flex-shrink-0 text-2xl text-indigo-700 dark:text-blue-600" />
    </SearchListItem>
  );
}

export default SeriesSearchItem;
