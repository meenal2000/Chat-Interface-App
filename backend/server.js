const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

const usernames = {}; // Track usernames by socket ID

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join', (username) => {
        usernames[socket.id] = username;
        console.log(`${username} has joined the chat.`);
        io.emit('userJoined', username); // Notify all users about the new user
    });

    socket.on('sendMessage', (message) => {
        const username = usernames[socket.id];
        // Include the username in the message object
        io.emit('receiveMessage', { ...message, user: username });
    });

    socket.on('typing', () => {
        socket.broadcast.emit('typing');
    });

    socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping');
    });

    socket.on('disconnect', () => {
        console.log(`${usernames[socket.id]} disconnected`);
        delete usernames[socket.id];
    });
});

server.listen(4000, () => console.log('Server is running on port 4000'));
