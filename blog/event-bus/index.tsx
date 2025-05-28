import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post('http://localhost:3001/events', event);
    axios.post('http://localhost:3000/events', event);
    axios.post('http://localhost:2000/events', event);

    res.send({ status: 'OK' });
});

app.listen(2001, () => {
  console.log('Rodando na porta 2001');
});
