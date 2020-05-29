//会触发编译一遍，User.js并且获取一个对象
let index = require('./User.js');

console.log(index);
//{ user: User { username: 'Tom', userage: 18 }, a: 1, b: 2 }
console.log(index.user);
//User { username: 'Tom', userage: 18 }
console.log(index.user.username);
//Tom
console.log(index.user.userage);
//18

console.log(index.a); //1
console.log(index.b); //2

//多次重复require都会指向第一次的对象地址，不会再次编译运行
let a = require('./User.js')
let b = require('./User.js')
console.log(a == b) //true

//引入第三方库
let $ = require('jquery')
console.log($)