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
    //console.log(msg);
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(msg.from+' '+formattedTime+' : '+msg.text);
    jQuery('#messages').append(li);
})
/*socket.emit('createMessage',{
    from:'Rewant',
    message:'Aaj se teri '
},function(){
    console.log('Got it');
})*/

socket.on('newLocationMessage',function(msg){
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(msg.from+' '+formattedTime+' : ');
    a.attr('href',msg.url);
    console.log(msg.url);
    li.append(a);
    jQuery('#messages').append(li);
},function () {
    
})

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from : 'User',
        message : jQuery('[name=message]').val()
    },function(){
        jQuery('[name=message]').val('')        ///to clear the text box
    })
});

jQuery('#send-location').on('click',function(){
    if(!navigator.geolocation)
    {
        return alert('Geolocation not supported by your browser');
    }

    jQuery('#send-location').attr('disabled','disabled').text('Sending Location..');

    navigator.geolocation.getCurrentPosition(function (position) {
        jQuery('#send-location').removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

        },function (){
            jQuery('#send-location').removeAttr('disabled').text('Send Location');
        return alert('Unable to fetch location');

    }

    )
})
