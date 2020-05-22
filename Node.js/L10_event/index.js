let events = require('events')

//初始化事件对象
let e = new events.EventEmitter();

//通过on添加某一命名事件触发事件队列
e.on('fileSuccess', function(eventMsg) {
    console.log('1.任务')
    console.log(eventMsg)
})

e.on('fileSuccess', function(eventMsg) {
    console.log('2.任务')
    console.log(eventMsg)
})

e.on('fileSuccess', function(eventMsg) {
    console.log('3.任务')
    console.log(eventMsg)
})

//实现读文件时间，并触发之前定义好的event
let fs = require('fs')

fs.readFile('./files/data.txt', { flags: 'r', encoding: 'utf-8' }, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        //console.log(data);
        //直接在readFile函数里触发一个回调函数
        e.emit('fileSuccess', data)
    }
});

//进一步封装，使用Promise对象的回调函数
function lcReadFile(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, { flags: 'r', encoding: 'utf-8' }, function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}

lcReadFile('./files/text.txt').then(function resolve(data) {
    e.emit('fileSuccess', data)
}, function reject(err) {
    console.log(err)
})


//再进一步封装，不使用promise的then函数回调
function lcReadFile(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, { flags: 'r', encoding: 'utf-8' }, function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}

async function test() {
    let data = await lcReadFile('./files/note.txt')
    e.emit('fileSuccess', data)
}

test()