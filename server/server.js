const path = require('path');
const express = require('express');
const socketIO  = require('socket.io');
const http = require('http');
const public_path = path.join(__dirname,'/../public');
const port = process.env.PORT || 3000;

const generateMessage = require('./utils/message.js').generateMessage;

var app = express();
var server  = http.createServer(app);
app.use(express.static(public_path));
var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('New user connected. ');
    socket.on('disconnect',()=>{
        console.log('Disconnected from client');
    })



    socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('createMessage',(msg,callback)=>{
        console.log('Create message',msg);
        io.emit('newMessage',generateMessage(msg.from,msg.message))
        callback();
    })
})



server.listen(port,()=>{
    console.log('Server is up and running in port ',port);
})

//https://evening-meadow-89856.herokuapp.com/