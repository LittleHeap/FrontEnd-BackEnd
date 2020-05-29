//导入文件模块
var fs = require('fs');

//(1)同步的方式
var content = fs.readFileSync('./hello.txt', { flag: 'r' });
console.log(content);
//没有encoding输出缓冲区内容：<Buffer 68 65 6c 6c 6f>
console.log(content.toString());
//hello

//直接把编码格式写入参数
var content = fs.readFileSync('./hello.txt', { flag: 'r', encoding: 'utf-8' });
console.log(content);
//hello

console.log('--------');

//(2)异步的方式
fs.readFile('./hello.txt', { flag: 'r', encoding: 'utf-8' }, function(err, data) {
    console.log('当前异步读取完毕');
    if (err) {
        console.log(err);
    } else {
        console.log(data); //hello
    }
})

//使用promise封装
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

//成功resolve时，then里第一个函数会被调用，失败reject时，then里第二个函数会被调用
pro.then(function(data) {
    console.log('Promise resolve then 触发:');
    console.log(data); //hello
}, function(err) {
    console.log('Promise reject then 触发:');
    console.log(err);
})

//连续异步读取
async function ReadList() {
    // 如果不用then，promise成功会返回resolve接受到的数据
    var file1 = await fsRead('hello1.txt');
    var file2 = await fsRead(file1 + '.txt');
    console.log(file2); //hello3
}
ReadList();