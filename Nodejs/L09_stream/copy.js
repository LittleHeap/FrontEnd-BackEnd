let fs = require('fs')

let rs = fs.createReadStream('./files/save.txt', { flags: 'r', encoding: 'utf-8' })

let ws = fs.createWriteStream('./files/data.txt', { flags: 'w', encoding: 'utf-8' })

rs.on('data', function(chunk) {
    console.log(chunk);
    ws.write(chunk, function() {
        console.log('写入一次');
    });
})