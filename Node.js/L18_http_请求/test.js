const myApp = require('./framework');

var app = new myApp();

app.on('/', (req, res) => {
    res.setHeader('content-type', 'text/html;charset=utf-8');
    res.end('<h1>Main Page</h1> <img src="./static/google.jpg">');
})

app.on('/domestic', (req, res) => {
    res.setHeader('content-type', 'text/html;charset=utf-8');
    if (req.pathInfo.base == 'index.html') {
        res.end('Domestic Main Page');
    } else {
        res.end('Domestic Other Page');
    }
})

app.on('/movies', (req, res) => {
    res.setHeader('content-type', 'text/html;charset=utf-8');
    let movies = [{
        name: '1.小丑',
        brief: 'XXXXXXX',
        author: 'AAA',
        stars: [1, 2, 3],
        info: [{
            name: '天天',
            gender: 'male'
        }, {
            name: '弟弟',
            gender: 'female'
        }]
    }, {
        name: '2.少年的你',
        brief: 'XXXXXXX',
        author: 'AAA',
        stars: [4, 5, 6],
        info: [{
            name: '天天',
            gender: 'male'
        }, {
            name: '弟弟',
            gender: 'female'
        }]
    }, {
        name: '3.天路',
        brief: 'XXXXXXX',
        author: 'AAA',
        stars: [7, 8, 9],
        info: [{
            name: '天天',
            gender: 'male'
        }, {
            name: '弟弟',
            gender: 'female'
        }]
    }]
    let index = req.pathInfo.base;
    // res.end(movies[index - 1].name);
    res.render('./templates/page.html', movies[index - 1]);
})

app.run(80, () => {
    console.log('Server Start on 127.0.0.1:80')
})