import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/login', (_req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
})

app.get('/signin/callback', (req, res) => {
  const { code } = req.query;

  return res.json(code);
})

app.listen(PORT, () => console.log(`:rocket Running at http://localhost:${PORT}`));