// 获取fs对象
let fs = require('fs');

//异步写文件，会覆盖掉前面的内容
fs.writeFile('./text.txt', 'write hello world ', { flag: 'w', encoding: 'utf-8' }, function(err) {
    if (err) {
        console.log('写入内容失败');
    } else {
        console.log('写入内容成功');
    }
})

//追加内容，flag=‘a’, append
fs.writeFile('./text.txt', 'append data', { flag: 'a', encoding: 'utf-8' }, function(err) {
    if (err) {
        console.log('追加内容失败');
    } else {
        console.log('追加内容成功');
    }
});
//以上这两步运行，因为是异步，不一定有序，可以使用嵌套，但是会疯掉，所以可以采用封装

//用Promise对象封装，为了保持异步但是有序
function writefs(path, content) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(path, content, { flag: 'a', encoding: 'utf-8' }, function(err) {
            if (err) {
                console.log('写入失败');
                reject(err);
            } else {
                console.log('写入成功');
                resolve(content);
            }
        })
    })
};

async function writeList() {
    //这样是保证有序的
    await writefs('listtext.txt', 'a');
    await writefs('listtext.txt', 'b');
    await writefs('listtext.txt', 'c');
    await writefs('listtext.txt', 'd');
};

writeList();