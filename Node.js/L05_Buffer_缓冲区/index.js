//1.js数组不能进行二进制操作
//2.js数组不像py和java一样灵活高效
//3.buffer会开辟内存固定空间

//字符串放入buffer
var str = 'hello world';
var buf = Buffer.from(str);
//输出二进制(16)编码
console.log(buf); //<Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
//输出buffer内容
console.log(buf.toString()); //hello world

//开辟一个buffer缓存区
var buf1 = Buffer.alloc(10);
buf1[0] = 1;
console.log(buf1);
//<Buffer 01 00 00 00 00 00 00 00 00 00>

//不安全的开辟区间
let buf2 = Buffer.allocUnsafe(100);
console.log(buf2);
//<Buffer 48 1c 03 05 01 00 00 00 08 20 03 05 01 00 00 00 00 00 00 00 00 00 00 00 18 1f 03 05 01 00 00 00 08 00 00 00 00 00 00 00 19 b0 23 f4 01 4c 60 00 00 00 ... 50 more bytes>
console.log(buf2.toString());