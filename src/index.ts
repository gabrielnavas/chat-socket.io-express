import express from 'express'
import { createServer } from 'node:http'

import { join } from 'node:path'

const app = express();
const server = createServer(app);

const httpPort = 3001

app.get('/', (req, res) => {
  const pathIndexHtml = join(__dirname, 'index.html')
  console.log(pathIndexHtml);
  
  return res.sendFile(pathIndexHtml)
});

server.listen(httpPort, () => {
  console.log(`server running at http://localhost:${httpPort}`);
})