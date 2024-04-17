import ElementHeader from "./ElementHeader";
import UserMap from "./UserMap";

function UserMapContainer() {
  return (
    <div className="relative grid h-full w-full grid-rows-[auto_1fr] overflow-hidden rounded-lg border-2 border-indigo-700 dark:border-blue-900">
      <ElementHeader className="z-10">user distribution map</ElementHeader>
      <UserMap />
    </div>
  );
}

export default UserMapContainer;
