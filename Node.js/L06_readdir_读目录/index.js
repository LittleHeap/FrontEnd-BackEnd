// 获取fs模块
var fs = require('fs');

//异步读取目录
fs.readdir('./dir', function(err, files) {
    if (err) {
        console.log(err);
    } else {
        console.log(files);
        //[ 'dir1', 'dir2', 'dir3' ]
    }
});

//循环读取输出目录内的信息
var { fsRead, fsWrite } = require('./myfs.js');
var txtPath = 'all.txt';

fs.readdir('./data', function(err, files) {
    if (err) {
        console.log(err);
    } else {
        console.log(files);
        //[ 'A.txt', 'B.txt', 'C.txt' ]
        files.forEach(async function(filename) {
            var content = await fsRead('./data/' + filename);
            await fsWrite(txtPath, content);
        });
    }
});