import { PiFinnTheHumanFill } from "react-icons/pi";
import SearchListItem from "./SearchListItem";

function CharSearchItem({ char }) {
  return (
    <SearchListItem to={`/character/${char.malId}`}>
      <img
        draggable="false"
        src={char.image}
        className="h-20 w-[3.5rem] rounded-md object-cover"
      />
      <h2 className="text-lg font-medium text-indigo-700 dark:text-blue-600">
        {char.name}
      </h2>
      <PiFinnTheHumanFill className="ml-auto flex-shrink-0 text-2xl text-indigo-700 dark:text-blue-600" />
    </SearchListItem>
  );
}

export default CharSearchItem;
