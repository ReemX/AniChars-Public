import GridItem from "./GridItem";

function GridComp({ data, onClick }) {
  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-1 p-2">
      {data.map((char) => (
        <GridItem
          key={char.mal_id}
          char={char}
          onClick={() => onClick(char.mal_id)}
        />
      ))}
    </div>
  );
}

export default GridComp;
