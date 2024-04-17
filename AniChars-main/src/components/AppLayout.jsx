import { Outlet } from "react-router-dom";
import Header from "./ui/Header";
import { scrollbar } from "../utils/helpers";
import { SocketProvider } from "../context/SocketContext";

function AppLayout() {
  return (
    <div>
      <SocketProvider>
        <Header />
        <main
          className={
            "h-[calc(100vh-3rem)] overflow-y-auto bg-gray-50 px-6 py-4 scrollbar-corner-gray-200 dark:bg-slate-900" +
            scrollbar()
          }
        >
          <Outlet />
        </main>
      </SocketProvider>
    </div>
  );
}

export default AppLayout;
