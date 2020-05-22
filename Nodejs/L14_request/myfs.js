let fs = require('fs')

//用Promise对象封装，为了保持异步但是有序
async function fsWrite(path, content) {
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

async function fsDir(path) {
    return new Promise(function(resolve, reject) {
        fs.mkdir(path, function(err) {
            if (err) {
                reject(err);
            } else {
                console.log('成功创建目录');
                resolve();
            }
        })
    })
}

module.exports = { fsWrite, fsDir }