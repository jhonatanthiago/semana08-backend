const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.get('/token', (req, res) => {
    const randomNumber = Math.random();
  
    const token = jwt.sign({ randomNumber }, process.env.SECRET, {
      expiresIn: '1h',
    });
  
    res.json({ token });
  });
  
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });  