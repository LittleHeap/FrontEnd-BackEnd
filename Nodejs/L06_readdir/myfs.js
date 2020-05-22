let fs = require('fs')

function fsRead(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, { flag: 'r', encoding: 'utf-8' }, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function fsWrite(path, content) {
    return new Promise(function(success, fail) {
        fs.writeFile(path, content, { flag: 'a', encoding: 'utf-8' }, function(err) {
            if (err) {
                console.log('写入内容失败');
                fail(err);
            } else {
                console.log('写入内容成功');
                success(err);
            }
        })
    })
}

module.exports = { fsRead, fsWrite }