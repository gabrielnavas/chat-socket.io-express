import express from 'express'
import { createServer } from 'node:http'

import { join } from 'node:path'

import { Server } from 'socket.io'

const app = express();

const server = createServer(app);
const io = new Server(server)

const httpPort = 3001


app.get('/', (req, res) => {
  const pathIndexHtml = join(__dirname, 'index.html')
  console.log(pathIndexHtml);

  return res.sendFile(pathIndexHtml)
});

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('chat', msg => {
    const you = `You say: ${msg}`;
    const other = `Other person with id ${socket.id} say: ${msg}`
    socket.emit('chat', {
      message: you
    });
    socket.broadcast.emit('chat', {
      message: other
    });
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

server.listen(httpPort, () => {
  console.log(`server running at http://localhost:${httpPort}`);
})