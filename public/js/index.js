var socket = io();

socket.on('connect', function()  {
    console.log('Connected to Server');

    socket.emit('createMessage', {
        from: 'other user',
        text: 'hey!'
    });
});

socket.on('disconnected', function() {
    console.log('unable to connect');
});

socket.on('newMessage', function(mess){
    console.log(mess);
});

/*socket.on('newEmail', function(email) {
    console.log('new Email', email);
}); */