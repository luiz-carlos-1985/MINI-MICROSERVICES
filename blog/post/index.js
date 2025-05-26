const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const posts = {};
const { randomBytes } = require('crypto');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
res.send(posts);
});

app.post ('/posts', (req, res) => {
const id = randomBytes(5).toString('hex');
const { title } = req.body;

posts[id] = {
    id, title
};

res.status(201).send(posts[id]);
});

app.listen(3001, () => {
console.log('Executando POST na porta 3001')
});