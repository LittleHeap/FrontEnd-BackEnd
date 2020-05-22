let fs = require('fs')

let rs = fs.createReadStream('./files/save.txt', { flags: 'r', encoding: 'utf-8' })

let ws = fs.createWriteStream('./files/pipedata.txt', { flags: 'w', encoding: 'utf-8' })

//使用管道流，直接将读出的流，接到写入的流
rs.pipe(ws)