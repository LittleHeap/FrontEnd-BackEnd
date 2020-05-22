//1.js数组不能进行二进制操作
//2.js数组不像py和java一样灵活高效
//3.buffer会开辟内存固定空间

//字符串放入buffer
var str = 'hello world'
let buf = Buffer.from(str)

//输出二进制(16)编码
console.log(buf)

//输出buffer内容
console.log(buf.toString())

//开辟一个buffer缓存区
let buf1 = Buffer.alloc(10)

buf1[0] = 1

console.log(buf1)

//不安全开辟区间
let buf2 = Buffer.allocUnsafe(100)

console.log(buf2)

console.log(buf2.toString())