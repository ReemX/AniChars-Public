import CharacterSearchedGraph from "./CharacterSearchedGraph";
import ElementHeader from "./ElementHeader";

function CharacterTop10Graph() {
  return (
    <div className="h-full w-full min-w-[56rem] rounded-lg border-2 border-indigo-700 bg-indigo-50 dark:border-blue-900 dark:bg-gray-800">
      <ElementHeader>top 10 most searched</ElementHeader>
      <div className="relative h-full pb-20 pt-5">
        <CharacterSearchedGraph />
      </div>
    </div>
  );
}

export default CharacterTop10Graph;
