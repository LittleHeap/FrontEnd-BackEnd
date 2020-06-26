const express = require('express');

const post = require('./routes/post');

const app = express();

app.use(express.json());

app.use('/post', post);

app.listen(3000, () => {
    console.log('server start')
});