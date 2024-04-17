const handleSocket = (socket, apiIo, io) => {
  apiIo.in("users_admin").emit("update_users", {
    users: io.engine.clientsCount,
    time: new Date(),
  });

  socket.on("join_room", (room) => {
    if (!room) return;
    socket.join(room);
  });

  socket.on("leave_room", (room) => {
    if (!room) return;
    socket.leave(room);
  });

  socket.on("update_room", (room, notifyAdmins = false) => {
    if (!room) return;
    const source = room.split("_")[0];
    socket.to(room).emit(`update_${source}`);
    if (notifyAdmins) {
      const adminRoom = `${source}_admin`;
      socket.to(adminRoom).emit(`update_${source}`);
    }
  });

  socket.on("get_live_users", () => {
    socket.emit("user_count", io.engine.clientsCount);
  });

  socket.on("disconnect", () => {
    apiIo.in("users_admin").emit("update_users", {
      users: io.engine.clientsCount,
      time: new Date(),
    });
  });
};

module.exports = handleSocket;
