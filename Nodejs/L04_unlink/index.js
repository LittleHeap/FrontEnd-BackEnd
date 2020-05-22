let fs = require('fs');

fs.unlink('./del.txt', function() {
    console.log('删除成功');
})