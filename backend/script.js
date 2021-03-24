const { readJSON, writeJSON } = require('./utils');
const { join } = require('path');
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const usersAddr = join(__dirname, './quiz.json');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/all-quiz', (req, res) => {
  readJSON(usersAddr, (_, data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`);
});