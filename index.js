// const express = require("express");
// var http = require("http");
// const exp = require("constants");
// const app = express();
// const port = process.env.PORT || 5000;
// var server = http.createServer(app);
// var io = require("socket.io")(server);

// //middleware
// app.use(express.json());
// var clients = {};
 
// io.on("connection", (socket) => {
//   console.log("connected");
//   console.log(socket.id, "has joined"); 
//   socket.on("signin", (id)=>{ 
//     console.log(id);

//     clients[id]= socket.id;
//     console.log('clients:', clients);

//     socket.on('message', (msg)=>{
//       console.log(msg); 

//       let targetId = msg.targetId;

//       if(clients[targetId])
//       clients[targetId].emit('message', msg)
//     });
//   });
// });

// server.listen(port, "0.0.0.0", () => {
//   console.log("Server connected on port", port);
// });


const express = require("express");
var http = require("http");
const exp = require("constants");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server); 
 
//middleware
app.use(express.json());
var clients = {};
const routes = require('./routes');
app.use('/routes', routes);
app.use('/uploads', express.static('uploads'));
 
 
io.on("connection", (socket) => {
  console.log("connected");
  console.log(socket.id, "has joined"); 
  socket.on("signin", (id)=>{ 
    console.log(id);

    clients[id]= socket.id;
    console.log('clients:', clients);

    socket.on('message', (msg)=>{
      console.log(msg); 

      let targetId = msg.targetId;

      if(clients[targetId])
      clients[targetId].emit('message', msg)
    });
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log("Server connected on port", port);
});
