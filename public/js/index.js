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
socket.on('newMessage',function(msg){
    console.log(msg);
    var li = jQuery('<li></li>');
    li.text(msg.from+' : '+msg.text);
    jQuery('#messages').append(li);
})
/*socket.emit('createMessage',{
    from:'Rewant',
    message:'Aaj se teri '
},function(){
    console.log('Got it');
})*/

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from : 'User',
        message : jQuery('[name=message]').val()
    },function(){
    })
});
