const express = require("express");
const http = require("http"); 
const WebSocket = require("ws");
const { connectToDatabase } = require('./startServer');
const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// server will be on port 3000 
const port = process.env.PORT || 3000;

// mapped to vehicleRoutes for any incoming requests
app.use('/checker', vehicleRoutes);

// Create HTTP server from Express app
const server = http.createServer(app);

// setup the websocket server
const wss = new WebSocket.Server({ server });

// the count of clients will always start from 0 and vehicle data count will be 3
let connectedClients = 0;
let vehicleDataCount = 3;

// function to broadcast data to all clients
function broadcastData() {
    const randomIncrement = Math.floor(Math.random() * 5) + 1; // add a random number from 1 to 5 to the vehicleDataCount
    vehicleDataCount += randomIncrement;

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ 
                clients: connectedClients,
                vehicleDataCount: vehicleDataCount 
            }));
        }
    });
}

// websocket connection handler
wss.on('connection', (ws) => {
    connectedClients++;
    console.log('New client connected. Total clients:', connectedClients);

    // Send data to the new client
    ws.send(JSON.stringify({
        clients: connectedClients,
        vehicleDataCount: vehicleDataCount
    }));

    // handle client disconnection
    ws.on('close', () => {
        connectedClients--;
        console.log('Client disconnected. Total clients:', connectedClients);
    });
});

// broadcast the vehicle data count to all clients every 10 seconds
setInterval(broadcastData, 10000);

// start HTTP and WebSocket server
server.listen(port, async () => {
    console.log("Server listening on port:", port);
    await connectToDatabase();
});