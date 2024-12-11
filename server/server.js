const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1'; // Change to your server's IP if needed
const port = 8000;

// Define the base directory for the server files
const baseDirectory = path.join(__dirname); // This will point to my-hls-server

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Set the file path based on the requested URL
    const filePath = path.join(baseDirectory, req.url === '/' ? 'output.m3u8' : req.url);
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
        res.end(content, 'utf-8');
    });
});

// Start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});