let fs = require('fs');

//创建写数据流
let ws = fs.createWriteStream('./files/write.txt', { flags: 'w', encoding: 'utf-8' });

ws.on('open', function() {
    console.log('1.文件打开');
});

ws.on('ready', function() {
    console.log('2.准备写入');
});

ws.write('hello ', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('3.写入数据1');
    }
});

ws.write('world', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('4.写入数据2');
    }
});

ws.end(function() {
    console.log('5.流入结束');
});

ws.on('close', function() {
    console.log('6.文件关闭');
});