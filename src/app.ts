import 'dotenv/config';
import express from 'express';
import { router } from './routes';
import { Server } from 'socket.io'
import http from 'http';
import cors from 'cors';


export const PORT = 3001;

const app = express();
app.use(cors())

export const serverHttp = http.createServer(app);

export const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
});

 io.on("connection", (socket) => {
  console.log(`User connected in the socket ${socket.id}`)
} )

app.use(express.json());

app.get('/login', (_req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
})

app.get('/signin/callback', (req, res) => {
  const { code } = req.query;

  return res.json({code});
})

app.use(router);
