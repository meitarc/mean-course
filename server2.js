const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

const debug2 = require('debug')('chatapp-backend:server');


//
//const port = normalizePort(process.env.PORT || '3000');
//app.set('port', port);

//const server = http.createServer(app);
//const io = require('socket.io').listen(server);

//io.on('connection', (socket)=> {
//  console.log('new conncetion is add');
//
//  socket.on('join',(data)=>{
//    socket.join(data.room);
//    socket.broadcast.to(data.room).emit('new user joined',{user : data.user , message: 'has joined the room'});
//  });
//  socket.on('leave',(data)=>{
//    socket.leave(data.room);
//    socket.broadcast.to(data.room).emit('left room',{user : data.user, message: 'left the room'});
//  });
//  socket.on('message',data => {
//    // console.log(data,"msg");
//    io.in(data.room).emit('new message',{user: data.user, message: data.message});
//  });
//});

//server.listen(port);
//server.on('error', onError);
//server.on('listening', onListening);
//


const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
