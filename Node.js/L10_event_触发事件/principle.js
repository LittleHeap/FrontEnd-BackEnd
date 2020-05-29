let fs = require('fs');

//读文件
fs.readFile('./files/data.txt', { flags: 'r', encoding: 'utf-8' }, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        //console.log(data);
        lcEvent.emit('fileSuccess', data);
    }
});

let lcEvent = {
    event: {

    },
    on: function(eventName, eventFun) {
        if (this.event[eventName]) {
            this.event[eventName].push(eventFun)
        } else {
            this.event[eventName] = []
            this.event[eventName].push(eventFun)
        }
    },
    emit: function(eventName, eventMsg) {
        if (this.event[eventName]) {
            this.event[eventName].forEach(itemFun => {
                itemFun(eventMsg)
            })
        }
    }
}

lcEvent.on('fileSuccess', function(eventMsg) {
    console.log('1.查询姓名')
    console.log(eventMsg)
})
lcEvent.on('fileSuccess', function(eventMsg) {
    console.log('2.查询年龄')
    console.log(eventMsg)
})
lcEvent.on('fileSuccess', function(eventMsg) {
    console.log('3.查询信息')
    console.log(eventMsg)
})