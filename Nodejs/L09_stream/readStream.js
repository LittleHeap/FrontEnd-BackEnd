let fs = require('fs');

//读文件流
let rs = fs.createReadStream('./files/save.txt', { flags: 'r', encoding: 'utf-8' });

rs.on('open', function() {
    console.log('读取文件打开');
})

rs.on('close', function() {
    console.log('读取文件关闭');
})

//每一批流入数据完成
rs.on('data', function(chunk) {
    console.log('单批数据:');
    console.log(chunk);
})

rs.on('end', function() {
    console.log('读取流结束');
})