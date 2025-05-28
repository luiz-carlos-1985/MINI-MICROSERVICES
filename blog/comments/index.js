const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { randomBytes } = require('crypto');
const commentsByPostId = {};
const cors = require('cors');
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors());

app.get('/posts/:id/comments', async (req, res) => {
res.send(commentsByPostId[req.params.id] || [])
});

app.post ('/posts/:id/comments', async (req, res) => {

const commentId = randomBytes(5).toString('hex');
const { content } = req.body;
const comments = commentsByPostId[req.params.id] || [];

comments.push({ id: commentId, content });
commentsByPostId[req.params.id] = comments;

await axios.post("http://localhost:2001/events", {
    type: "COMMENT_CREATED",
    data: { id: commentId, content, postId: req.params.id },
  });

res.status(201).send(comments);
});

app.listen(2000, () => {
console.log('Executando COMMENTS na porta 2000')
});