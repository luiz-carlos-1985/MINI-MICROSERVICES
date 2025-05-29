const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const posts = {};
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(5).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  try {
    await axios.post("http://localhost:2001/events", {
      type: "POST_CREATED",
      data: { id, title },
    });
  } catch (error) {
    console.error("Error posting event to event bus:", error.message);
  }

  res.status(201).send(posts[id]);
});

app.post('/events', (req,res) => {
  console.log('Evento recebido em Post microservice.', req.body.type);
  res.send({});
});

app.listen(3001, () => {
  console.log("Executando POST na porta 3001");
});
