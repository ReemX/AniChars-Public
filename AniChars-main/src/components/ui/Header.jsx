import Logo from "./Logo";
import Avatar from "../user/Avatar";
import SearchBar from "../search/SearchBar";

function Header() {
  return (
    <div className="flex h-12 items-center justify-between bg-indigo-600 px-4 dark:bg-blue-900">
      <Logo to="/dashboard" type="small" />
      <SearchBar />
      <Avatar
        modal={true}
        className="z-50 h-7 w-7 text-xl transition-transform hover:scale-110"
      />
    </div>
  );
}

export default Header;
