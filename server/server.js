const path = require('path');
const express = require('express');
const socketIO  = require('socket.io');
const http = require('http');
const public_path = path.join(__dirname,'/../public');
const port = process.env.PORT || 3000;

const generateMessage = require('./utils/message.js').generateMessage;
const generateLocation = require('./utils/message.js').generateLocation;
const isRealString = require('./utils/validation').isRealString;
const Users = require('./utils/users').Users;

var app = express();
var server  = http.createServer(app);
app.use(express.static(public_path));
var io = socketIO(server);
var user = new Users();

io.on('connection',(socket)=>{
    console.log('New user connected. ');

   // socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App'));

 //   socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room) )
{
    return callback('Name or room name is invalid');
}
socket.join(params.room);
        user.removeUser(socket.id);
        user.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUserList',user.getUserList(params.room));
socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App'));
var str = params.name+' has joined';
socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',str));


    callback();
    })                                       //callback is for error acknowledgements

    socket.on('createMessage',(msg,callback)=>{
      //  console.log('Create message',msg);
        var us = user.getUser(socket.id)[0];
       // console.log(us.room);
        if(us && isRealString(msg.message)) {
            io.to(us.room).emit('newMessage', generateMessage(us.name, msg.message));
        }
        callback();
    })

    socket.on('createLocationMessage',(coords)=>{
       // var location = 'Latitude: ' + coords.latitude +'  Longitude: ' + coords.longitude;
        var us = user.getUser(socket.id)[0];
    if(us){
        io.to(us.room).emit('newLocationMessage', generateLocation(us.name,coords.latitude, coords.longitude));
    }

    })
socket.on('disconnect',()=>{
    console.log('Disconnected from client');
    var us = user.removeUser(socket.id);
    if(us) {
        io.to(us.room).emit('updateUserList', user.getUserList(us.room));
        var msg = us.name + ' left';
        io.to(us.room).emit('newMessage', generateMessage('Admin', msg));
    }
})

})



server.listen(port,()=>{
    console.log('Server is up and running in port ',port);
})

//https://evening-meadow-89856.herokuapp.com/