let fs = require('fs');

//创建读数据流
let rs = fs.createReadStream('./files/read.txt', { flags: 'r', encoding: 'utf-8' });

rs.on('open', function() {
    console.log('1.读取文件打开');
});
rs.on('data', function(chunk) {
    //每一批流入数据完成
    console.log('2.单批数据:' + chunk);
});
rs.on('end', function() {
    console.log('3.读取流结束');
});
rs.on('close', function() {
    console.log('4.读取文件关闭');
});