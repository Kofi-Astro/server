


const express = require("express");
const http = require("http");
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);


// Connect to MongoDB
mongoose.connect('mongodb://172.30.1.158:27017/chatapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// app.use(bodyParser.json());

//middleware
app.use(express.json());
app.use(bodyParser.json());
var clients = {};
const routes = require('./routes');
app.use('/routes', routes);
app.use('/uploads', express.static('uploads'));

app.use('/users', userRoutes);


io.on("connection", (socket) => {
  console.log("connected");
  console.log(socket.id, "has joined");
  socket.on("signin", (id) => {
    console.log(id);

    clients[id] = socket.id;
    console.log('clients:', clients);

    socket.on('message', (msg) => {
      console.log(msg);

      let targetId = msg.targetId;

      if (clients[targetId])
        clients[targetId].emit('message', msg)
    });
  });
});

server.listen(port, () => {
  console.log("Server connected on port", port);
});
