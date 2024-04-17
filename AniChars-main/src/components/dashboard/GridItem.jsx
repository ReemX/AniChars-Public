function GridItem({ char, onClick }) {
  let firstName = char.name.includes(" ") ? char.name.split(" ")[0] : char.name;
  if (firstName.length > 8) firstName = firstName.slice(0, 8) + "...";
  return (
    <div
      className="group flex cursor-pointer flex-col items-center rounded-md border-2 border-indigo-700 bg-indigo-100 p-1 transition-all hover:scale-105 hover:bg-indigo-500 dark:border-blue-900 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-blue-900"
      onClick={onClick}
    >
      <img
        src={char.image}
        className="h-[3.75rem] w-full rounded-md object-cover"
      />
      <p className="text-xs transition-colors group-hover:text-white dark:group-hover:text-gray-300">
        {firstName}
      </p>
    </div>
  );
}

export default GridItem;
