let fs = require('fs')

//异步：操作写文件，会覆盖掉前面的内容
fs.writeFile('./text.txt', 'write hello world', { flag: 'w', encoding: 'utf-8' }, function(err) {
    if (err) {
        console.log('写入内容失败');
    } else {
        console.log('写入内容成功');
    }
})

//flag = 'a' 追加内容
fs.writeFile('./text.txt', 'new data', { flag: 'a', encoding: 'utf-8' }, function(err) {
    if (err) {
        console.log('写入内容失败');
    } else {
        console.log('写入内容成功');
    }
})

//以上这两步运行，因为是异步，不一定有序，可以使用嵌套，但是会疯掉，所以可以采用封装

//用Promise对象封装，为了保持异步但是有序
function writefs(path, content) {
    return new Promise(function(success, fail) {
        fs.writeFile(path, content, { flag: 'a', encoding: 'utf-8' }, function(err) {
            if (err) {
                console.log('写入内容失败');
                fail(err);
            } else {
                console.log('写入内容成功');
                success(err);
            }
        })
    })
}

async function writeList() {
    //这样是保证有序的
    await writefs('listtext.txt', 'a');
    await writefs('listtext.txt', 'b');
    await writefs('listtext.txt', 'c');
    await writefs('listtext.txt', 'd');
}

writeList();