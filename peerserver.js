// peerserver.js
const { PeerServer } = require('peer');
const cors = require('cors');
const express = require('express');
const fs = require('fs');

// Configuration
const PORT = process.env.PEER_PORT || 9000;
const app = express();

// Setup CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Serve static files (e.g., if you want to serve an API)
app.use(express.static('public'));

// Create the PeerJS server
const peerServer = PeerServer({
  port: PORT,
  path: '/',
  proxied: true,
  corsOptions: {
    origin: '*',
    credentials: true
  },
  // Uncomment these lines if you want to use SSL
  // ssl: {
  //   key: fs.readFileSync('/path/to/your/ssl/key.pem', 'utf8'),
  //   cert: fs.readFileSync('/path/to/your/ssl/cert.pem', 'utf8')
  // }
});

// Event handlers
peerServer.on('connection', (client) => {
  console.log(`Client connected to peer server: ${client.id}`);
});

peerServer.on('disconnect', (client) => {
  console.log(`Client disconnected from peer server: ${client.id}`);
});

// Log startup
console.log(`PeerJS Server running on port ${PORT}`);
