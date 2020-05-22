let os = require('os')

//获取CPU信息
console.log(os.cpus())

//获取内存信息
console.log(os.totalmem())

//获取cpu架构
console.log(os.arch())

//获取剩余内存量
console.log(os.freemem())

//获取平台信息
console.log(os.platform())