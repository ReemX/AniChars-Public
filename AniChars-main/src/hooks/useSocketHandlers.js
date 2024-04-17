import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";

function useSocketHandlers({ room, onUpdate, notifyAdmins = false }) {
  const socket = useSocket();
  const source = room.split("_")[0];

  useEffect(() => {
    socket.emit("join_room", room);

    socket.on(`update_${source}`, (data) => {
      onUpdate(data);
    });

    return () => {
      socket.emit("leave_room", room);
      socket.off(`update_${source}`);
    };
  }, [socket, room, onUpdate, source]);

  const emitter = () => {
    onUpdate();
    socket.emit("update_room", room, notifyAdmins);
  };

  return { emitter };
}

export default useSocketHandlers;
