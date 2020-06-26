const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world');
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).send();
});

app.put('/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.send();
});

app.delete('/:id', (req, res) => {
    console.log(req.params.id);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('server start')
});