import { Outlet } from "react-router-dom";
import HomeBgBlur from "./HomeBgBlur";

function HomeLayout() {
  return (
    <HomeBgBlur>
      <Outlet />
    </HomeBgBlur>
  );
}

export default HomeLayout;
