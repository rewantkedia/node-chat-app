const path = require('path');
const express = require('express');
const socketIO  = require('socket.io');
const http = require('http');
const public_path = path.join(__dirname,'/../public');
const port = process.env.PORT || 3000;

var app = express();
var server  = http.createServer(app);
app.use(express.static(public_path));
var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('New user connected. ');
    socket.on('disconnect',()=>{
        console.log('Disconnected from client');
    })

    socket.on('createMessage',(message)=>{
        console.log('Create message',message);

    })

    socket.emit('newMessage',{
    from: 'John',
        text: 'New message',
        createdAt:  123123})
})



server.listen(port,()=>{
    console.log('Server is up and running in port ',port);
})

//https://evening-meadow-89856.herokuapp.com/