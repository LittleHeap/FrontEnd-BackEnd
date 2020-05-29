class User {
    constructor() {
        this.username = 'Tom';
        this.userage = 18;
    }
}

var u1 = new User();

//打印u1对象信息
console.log(u1);
//User { username: 'Tom', userage: 18 }

//将u1对象导出给exports对象的user属性
exports.user = u1;

// 再添加点其他属性
a = 1;
b = 2;
//exports 和 module.exports 指向同一个地址对象，系统找的是module.exports指向的对象

//只能设置单个属性
exports.a = a;
//可以设置整个对象
module.exports.b = b;

//这样做导出数据不受影响，因为系统找的是module.exports
exports = u1;
//这样做导出数据会受影响
//module.exports = u1;