//会触发编译一遍，User.js并且获取一个对象
let index = require('./User.js')

console.log(index)

console.log(index.user)
console.log(index.user.username)
console.log(index.user.userage)

console.log(index.a)
console.log(index.b)

//多次重复require都会指向第一次的对象地址
let a = require('./User.js')
let b = require('./User.js')
console.log(a == b)

//引入第三方库
let $ = require('jquery')
console.log($)