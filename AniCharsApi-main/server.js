const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
const handleSocket = require("./utils/handleSocket");

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("connection with db made!"));

const port = process.env.PORT || 3000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  },
});

const apiIo = io.of("/api/v1/");

apiIo.on("connection", (socket) => handleSocket(socket, apiIo, io));

server.listen(port, () => {
  console.log("Server is running on port 3000");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
