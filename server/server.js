const path = require('path');
const http = require('http');
const express= require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io= socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user');

    socket.emit('newMessage', generateMessage('Hoang', 'Welcome to the chatapp!'));
    
    socket.broadcast.emit('newMessage', generateMessage('Hoang', 'New User joined!'));

    socket.on('createMessage', (newMess, callback) => {
        console.log(newMess);
               
        io.emit('newMessage', generateMessage(newMess.from, newMess.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
            io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
        });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});

server.listen(port, () =>{
    console.log('Server is on port ' + port);
});