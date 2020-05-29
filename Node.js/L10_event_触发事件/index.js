let events = require('events')

//初始化事件对象
let e = new events.EventEmitter();

//通过on添加某一命名事件触发事件队列
e.on('fileSuccess', function(eventMsg) {
    console.log('1.任务' + eventMsg);
})
e.on('fileSuccess', function(eventMsg) {
    console.log('2.任务' + eventMsg);
})
e.on('fileSuccess', function(eventMsg) {
    console.log('3.任务' + eventMsg);
})

//实现读文件时间，并触发之前定义好的event
let fs = require('fs')

fs.readFile('./files/data.txt', { flags: 'r', encoding: 'utf-8' }, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        //直接在readFile函数里触发一个回调函数
        e.emit('fileSuccess', data)
    }
});

// 使用Promise对象的回调函数
function lcReadFile(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, { flags: 'r', encoding: 'utf-8' }, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
};

// 用then触发
lcReadFile('./files/text.txt').then(function(data) {
    e.emit('fileSuccess', data)
}, function(err) {
    console.log(err)
})

// 不用then触发
async function test() {
    var data = await lcReadFile('./files/note.txt')
    e.emit('fileSuccess', data)
}
test()