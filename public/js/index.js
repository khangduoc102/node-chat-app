var socket = io();

socket.on('connect', function()  {
    console.log('Connected to Server');

});



socket.on('disconnect', function() {
    console.log('unable to connect');
});

socket.on('newMessage', function(mess){
    console.log(mess);
    var li = jQuery('<li></li>');
    li.text(`${mess.from}: ${mess.text}`);

    jQuery('#messages').append(li);
});

/*socket.on('newEmail', function(email) {
    console.log('new Email', email);
}); */

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});