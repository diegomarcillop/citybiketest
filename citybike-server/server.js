const axios = require("axios").default;
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const CITY_BIKE_URL = "http://api.citybik.es/v2/networks/decobike-miami-beach"
const INTERVAL = 60000;//60000;
const LIMIT = 5;

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();

const server = http.createServer(app);
const io = socketIo(server); // < Interesting!
let history = [];

app.use(index);

io.on("connection", socket => {
  const socketId = socket.id;
  const clientIp = socket.request.connection.remoteAddress;
  console.log("New connection " + socketId + " from " + clientIp);
  socket.on("disconnect", () => {
    history = [];
  });

  emitCity(socket);
  setInterval(() => {
    emitCity(socket);
  }, INTERVAL);

  socket.on('save-history', (newHistory) => { setHistory(newHistory) });
  emitGetHistory(socket);
  setInterval(() => {
    emitGetHistory(socket);
  }, INTERVAL);
});

const setHistory = async (item) => {
  if (history.length === LIMIT) {
    history.push(item);
    history.shift()
  } else {
    history.push(item);
  }
}

const emitGetHistory = (socket) => {
  socket.emit('get-history', history);
}

const emitCity = (socket) => {
  axios.get(CITY_BIKE_URL).then((data) => {
    socket.emit("decobike/city", { data: data?.data?.network, ok: true });
  }).catch((err) => console.log(err.message));

}

server.listen(port, () => console.log(`Listening on port ${port}`));


