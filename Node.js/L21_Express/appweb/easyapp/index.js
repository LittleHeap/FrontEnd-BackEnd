const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('<h1>hello world</h1>');
});

app.listen(8080, () => {
    console.log('Server Start.');
});