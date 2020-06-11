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

app.run(80, () => {
    console.log('Server Start on 127.0.0.1:80')
})