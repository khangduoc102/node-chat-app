var socket = io();

socket.on('connect', function()  {
    console.log('Connected to Server');

    socket.on('welcome', function(welcome) {
    console.log(welcome);
    });
});



socket.on('disconnect', function() {
    console.log('unable to connect');
});

socket.on('newMessage', function(mess){
    console.log(mess);
});

/*socket.on('newEmail', function(email) {
    console.log('new Email', email);
}); */