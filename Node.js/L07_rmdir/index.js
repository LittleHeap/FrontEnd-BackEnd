let fs = require('fs')

fs.rmdir('./dir', function() {
    console.log('删除目录成功');
})