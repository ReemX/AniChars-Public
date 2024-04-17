import CharacterTop10Graph from "./CharacterTop10Graph";
import CharactersGrid from "./CharactersGrid";
import CommentWatcher from "./CommentWatcher";
import LiveUsers from "./LiveUsers";
import UserMapContainer from "./UserMapContainer";
import VerticalDivider from "./VerticalDivider";

function AdminDash() {
  return (
    <div className="mx-auto grid h-full min-h-[38.75rem] max-w-[115.625rem] grid-cols-[20rem_auto_1fr] grid-rows-2 gap-y-10">
      <div className="row-span-full grid grid-rows-[auto_1fr] gap-y-[6rem]">
        <CharactersGrid />
        <CommentWatcher />
      </div>
      <VerticalDivider />
      <CharacterTop10Graph />
      <div className="grid h-full grid-cols-2 gap-10">
        <LiveUsers />
        <UserMapContainer />
      </div>
    </div>
  );
}

export default AdminDash;
