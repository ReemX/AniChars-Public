import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";
import { useDarkMode } from "../../context/DarkModeContext";
import useSocketHandlers from "../../hooks/useSocketHandlers";
import ElementHeader from "./ElementHeader";
import { useSocket } from "../../context/SocketContext";

const starter = (data) => ({ users: data, time: format(new Date(), "HH:mm") });

function LiveUsers() {
  const { isDarkMode } = useDarkMode();
  const [dataset, setDataset] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    socket.emit("get_live_users");
    socket.on("user_count", (data) => {
      setDataset(Array.from({ length: 9 }, () => starter(data)));
    });
  }, [socket]);

  useSocketHandlers({
    room: "users_admin",
    onUpdate: (data) => {
      setDataset((prevDataset) => [
        ...prevDataset.slice(1),
        { users: data.users, time: format(data.time, "HH:mm") },
      ]);
    },
  });

  return (
    <div className="grid h-full grid-rows-[auto_1fr] rounded-lg border-2 border-indigo-700 bg-indigo-50 dark:border-blue-900 dark:bg-gray-800">
      <ElementHeader>live users</ElementHeader>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={dataset}
          margin={{
            top: 10,
            right: 60,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="time" interval={1} />
          <YAxis domain={[0, "dataMax + 5"]} />
          <Tooltip />
          <Area
            type={"monotone"}
            dataKey="users"
            stroke={isDarkMode ? colors.blue[700] : colors.indigo[700]}
            fill={isDarkMode ? colors.blue[800] : colors.indigo[800]}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LiveUsers;
