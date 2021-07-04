const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom, getUniqueRooms } = require('./utils/users');

// Configurate the server with socket.io
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

// Setting up a static folder
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

// Listen to the client connection
io.on('connection', (socket) => {

    // Interraction with join page
    socket.on('joinPageGreeting', () => {

        // Notifycation about new connection
        console.log('We have a new connection from join page ;)')
        
        // Updating the current rooms list
        io.emit('roomList', getUniqueRooms());
    })
    
    
    // Interraction with chat page
    socket.on('join', (options, callback) => {
        
        // Notifycation about new connection
        console.log('New connection from chat page!')

        // Getting the arguments sent by client
        const { error, user } = addUser({ id: socket.id, ...options })
        
        // Updating the current rooms list and updating join page
        io.emit('roomList', getUniqueRooms());
        
        // Checking if there was an error
        if (error) {
            return callback(error);
        }
        
        // Join a user to the room
        socket.join(user.room)
        
        // Greeting new user as a first message
        socket.emit('message', generateMessage('Admin', 'Welcome!'));
        
        // Send a message to others in the room, that the user has joined
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`));
        
        // Updating the side bar list of users
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
        
        callback();
    })
    
    // Send message only to the room
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        const filter = new Filter();
        
        // Checking if the message is allowed
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!');
        }
        
        // Sending the message
        io.to(user.room).emit('message', generateMessage(user.username, message));
        callback();
    })
    
    // Send location only to the room
    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback();
    })
    
    // Disconnecting user
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        
        // Updating the current rooms list and updating join page
        io.emit('roomList', getUniqueRooms());
        
        
        if (user) {
            // Sending a message, that user has left
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`));
            
            // Updating the side bar list of users
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
        
    })
})

// Listen to the server
server.listen(port, () => {
    console.log('Server is up on port ' + port);
});