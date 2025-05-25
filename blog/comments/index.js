const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { randomBytes } = require('crypto');
const commentsByPostId = {};

app.use(bodyParser.json());

app.get('/posts/:id/comments', (req, res) => {
res.send(commentsByPostId[req.params.id] || [])
});

app.post ('/posts/:id/comments', (req, res) => {

const commentId = randomBytes(5).toString('hex');
const { content } = req.body;
const comments = commentsByPostId[req.params.id] || [];

comments.push({ id: commentId, content });
commentsByPostId[req.params.id] = comments;

res.status(201).send(comments);
});

app.listen(2000, () => {
console.log('Executando COMMENTS na porta 2000')
});