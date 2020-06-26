var express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('Main Page');
});

// 类正则匹配
app.get('/ab?cd', (req, res) => {
    res.send('abcd or acd');
});

// 正则匹配路径
app.get(/\/a\d{10,}/, (req, res) => {
    res.send('aXXXXXXXXXXX');
});

// 动态路由
app.get('/news/:catagaryid/:newsid', (req, res) => {
    res.send('类别:' + req.params.newsid + '\n' + 'id:' + req.params.newsid);
});

app.listen(3000);