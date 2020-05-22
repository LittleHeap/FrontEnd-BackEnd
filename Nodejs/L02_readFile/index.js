//导入文件模块
var fs = require('fs')

//读写文件有同步&异步之分

//(1)同步的方式
var f = fs.openSync('./hello.txt', 'r')

//得到文件描述符的整数
console.log(f) //20

//读取文件内容
var content = fs.readFileSync('./hello.txt', { flag: 'r' });

console.log(content) //没有encoding输出缓冲区内容
console.log(content.toString()) //hello1

var content = fs.readFileSync('./hello.txt', { flag: 'r', encoding: 'utf-8' });

console.log(content); //hello1

console.log('--------');

//(2)异步的方式
fs.readFile('./hello.txt', { flag: 'r', encoding: 'utf-8' }, function(err, data) {
    console.log('当前异步读取完毕');
    if (err) {
        console.log(err);
    } else {
        console.log(data); //hello1
    }
})

console.log('异步方式验证字符串');

//异步方式防止循环回调嵌套，使用promise封装
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

var pro = fsRead('./hello.txt');

pro.then(function A(data) {
    console.log('Promise resolve then 触发:');
    console.log(data); //hello1
    console.log('--------')
}, function B(err) {
    console.log('Promise reject then 触发:');
    console.log(err);
})

//连续异步读取
async function ReadList() {
    var file1 = await fsRead('hello.txt');
    var file2 = await fsRead(file1 + '.txt');
    var finalcontent = await fsRead(file2 + '.txt');
    console.log(finalcontent);
}

ReadList();