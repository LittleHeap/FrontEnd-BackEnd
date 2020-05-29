let fs = require('fs');

// 创建读数据流
let rs = fs.createReadStream('./files/from.txt', { flags: 'r', encoding: 'utf-8' });
// 创建写数据流
let ws = fs.createWriteStream('./files/to.txt', { flags: 'w', encoding: 'utf-8' });
// 操作获取的数据，没有文件会自动创建文件，有文件会覆盖里面内容
rs.on('data', function(chunk) {
    console.log(chunk);
    ws.write(chunk, function() {
        console.log('写入数据');
    });
});