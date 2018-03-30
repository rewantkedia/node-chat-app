var socket = io();
socket.on('connect',function(){ //builtin event 'connect'
    console.log('Connected to server');
    /*socket.emit('createMessage',{
        from: 'Rewant',
        message: 'Hellow World'
    })*/
})
socket.on('disconnect',function(){
    console.log('Disconnected from server');
})
socket.on('newMessage',function(message){
    console.log(message);
})