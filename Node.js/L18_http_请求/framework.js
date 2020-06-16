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
                res.render = render;
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

function render(path, options) {
    fs.readFile(path, { flag: 'r', encoding: 'utf-8' }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // 匹配循环变量(先匹配循环，否自普通变量会匹配冲突)
            data = replaceArr(data, options);
            // 匹配普通变量
            data = replaceVar(data, options);
            this.end(data);
        }
    });
}

function replaceVar(data, options) {
    let reg = /\{\{(.*?)\}\}/igs;
    let result;
    while (result = reg.exec(data)) {
        let strKey = result[1].trim();
        // let strValue = options[strKey];
        let strValue = eval('options.' + strKey);
        data = data.replace(result[0], strValue);
    }
    return data;
}

function replaceArr(data, options) {
    let reg = /\{\%for \{(.*?)\}\%\}(.*?)\{\%endfor\%\}/igs;
    while (result = reg.exec(data)) {
        console.log(result);
        let strKey = result[1].trim();
        let strValueArr = options[strKey];
        console.log(strKey);
        let listStr = '';
        strValueArr.forEach((item, index) => {
            listStr += replaceVar(result[2], { 'item': item });
        });
        data = data.replace(result[0], listStr);
    }
    return data;
}

module.exports = MyApp;