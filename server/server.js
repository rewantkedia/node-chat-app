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



    socket.emit('newMessage',{
        from: "admin",
        text: "Welcome to the chat app",
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage',{
        from: "admin",
        text: "New user joined",
        createdAt: new Date().getTime()
    })
    socket.on('createMessage',(msg)=>{
        console.log('Create message',msg);
        io.emit('newMessage',{                       //broadcasts to every user including the current one
            from: msg.from,
            message: msg.message,
            createdAt: new Date().getTime()
        })
        /*socket.broadcast.emit('newMessage',{         //broadcasts to every user except the current one
            from: msg.from,
            message: msg.message,
            createdAt: new Date().getTime();
        })*/

    })

})



server.listen(port,()=>{
    console.log('Server is up and running in port ',port);
})

//https://evening-meadow-89856.herokuapp.com/