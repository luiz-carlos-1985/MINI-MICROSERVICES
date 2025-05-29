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

try {
  await axios.post("http://localhost:2001/events", {
    type: "COMMENT_CREATED",
    data: { id: commentId, content, postId: req.params.id },
  });
} catch (error) {
  console.error("Error posting event to event bus:", error.message);
}

res.status(201).send(comments);
});

app.post('/events', (req,res) => {
  console.log('Evento recebido em Comments microservice.', req.body.type);
  res.send({});
});

app.listen(5000, () => {
console.log('Executando COMMENTS na porta 5000')
});