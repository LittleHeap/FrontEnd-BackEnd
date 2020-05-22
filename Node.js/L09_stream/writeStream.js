let fs = require('fs')

//写文件流
let ws = fs.createWriteStream('./files/save.txt', { flags: 'w', encoding: 'utf-8' })

ws.on('open', function() {
    console.log('文件打开');
})

ws.on('ready', function() {
    console.log('写入准备');
})

ws.on('close', function() {
    console.log('文件关闭');
})


ws.write('hello world1 ', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('写入成功');
    }
});

ws.write('hello world2 ', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('写入成功');
    }
});

ws.write('hello world3 ', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('写入成功');
    }
});

//end相当于关闭水管
ws.end(function() {
    console.log('流入结束');
});