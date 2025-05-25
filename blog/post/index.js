const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const posts = {};
const { randomBytes } = require('crypto');

app.use(bodyParser.json());

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

app.listen(3000, () => {
console.log('Executando CLIENTE na porta 3000')
});