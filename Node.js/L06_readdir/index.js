let fs = require('fs')

//使用异步的目录读取方法
fs.readdir('./dir', function(err, files) {
    if (err) {
        console.log(err);
    } else {
        console.log(files);
    }
})

//循环读取输出目录内的信息
let { fsRead, fsWrite } = require('./myfs.js')

const txtPath = 'all.txt';

fs.readdir('./data', function(err, files) {
    if (err) {
        console.log(err);
    } else {
        console.log(files);
        files.forEach(async function(filename, i) {
            let content = await fsRead('./data/' + filename);
            await fsWrite(txtPath, content);
        })
    }
})