const fs = require('fs');

// 原函数
fs.readFile('data.txt', { flag: 'r', encoding: 'utf-8' }, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})

// 转成Promise对象
async function myfs(path) {
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

async function test() {
    var res = await myfs('data.txt');
    console.log(res);
}

test();