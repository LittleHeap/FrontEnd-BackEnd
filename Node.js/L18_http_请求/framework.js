const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

class MyApp {
    constructor() {
        this.server = http.createServer();
        this.reqEvent = {};
        this.server.on('request', (req, res) => {
            var pathObj = path.parse(req.url);
            if (pathObj.dir in this.reqEvent) {
                req.pathInfo = pathObj;
                this.reqEvent[pathObj.dir](req, res);
            } else if (pathObj.dir == '/static') {
                res.setHeader('content-type', this.getContentType(pathObj.ext));
                let rs = fs.createReadStream('./static/' + pathObj.base);
                rs.pipe(res);
            } else {
                res.setHeader('content-type', 'text/html;charset=utf-8');
                res.end('<h1>404</h1>');
            }
        })
    }
    on(url, func) {
        this.reqEvent[url] = func;
    }
    run(port, callback) {
        this.server.listen(port, callback);
    }
    getContentType(extName) {
        switch (extName) {
            case '.jpg':
                return 'image/jpeg';
            case '.html':
                return 'text/html;charset=utf-8'
        }
    }
}

module.exports = MyApp;