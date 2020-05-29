let fs = require('fs');

// 创建读数据流
let rs = fs.createReadStream('./files/from.txt', { flags: 'r', encoding: 'utf-8' });
// 创建写数据流
let ws = fs.createWriteStream('./files/to.txt', { flags: 'w', encoding: 'utf-8' });
//使用管道流，直接将读出的流，接到写入的流
rs.pipe(ws);