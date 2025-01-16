const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');
const cors = require('cors')

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    }
);

const JSON_SERVER_URL = 'http://localhost:3001/votes';

app.use(express.json());
app.use(cors())

// Broadcast updates to all connected clients
const broadcastUpdate = async () => {
    try {
        const response = await axios.get(JSON_SERVER_URL);
        io.emit('updateVotes', response.data);
    } catch (error) {
        console.error('Error broadcasting updates:', error);
    }
};

app.get('/votes', async (req, res) => {
    try {
        const response = await axios.get(JSON_SERVER_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error getting member');
    }
})
// Route to add a member
app.post('/votes', async (req, res) => {
    try {
        console.log(req.body)
        const response = await axios.post(JSON_SERVER_URL, req.body);
        await broadcastUpdate();
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error adding member');
    }
});

// Route to update a member (votes or fullname)
app.patch('/votes/:id', async (req, res) => {
    try {
        console.log(req.params.id, req.body)
        const response = await axios.patch(`${JSON_SERVER_URL}/${req.params.id}`, req.body);
        await broadcastUpdate();
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error updating member');
    }
});

// Route to delete a member
app.delete('/votes/:id', async (req, res) => {
    try {
        const response = await axios.delete(`${JSON_SERVER_URL}/${req.params.id}`);
        await broadcastUpdate();
        res.json(response.data);
    } catch (error) {
        console.log(error)
        res.status(500).send('Error deleting member');
    }
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected');
    broadcastUpdate(); // Send the latest data on connection

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = 3002;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
