const path = require('path');
const http = require('http');
const express= require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io= socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user');

    socket.emit('welcome', generateMessage('Hoang', 'Welcome to the chatapp!'));
    
    socket.broadcast.emit('welcome', generateMessage('Hoang', 'New User joined!'));

    socket.on('createMessage', (newMess) => {
        console.log(newMess);
        
        
        io.emit('newMessage', generateMessage(newMess.from, newMess.text));
        /*
        socket.broadcast.emit('newMessage', {
        from: newMess.from,
        text: newMess.text,
        createdAt: new Date().getTime()
         });
         */
    
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});

server.listen(port, () =>{
    console.log('Server is on port ' + port);
});