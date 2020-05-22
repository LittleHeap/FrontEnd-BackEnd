let path = require('path')

//解析扩展名
let strPath = 'res/file/index.html'

let info = path.extname(strPath)

console.log(info)

//拼接路径
let arr = ['/root', 'qianduan', 'index']

let info1 = path.resolve(...arr)

console.log(info1)

//拼接路径
let cur = __dirname

let info2 = path.join(cur, 'data', 'final')

console.log(info2)

//解析网页请求路径
let str = 'http://www.baidu.com/xinwen/guonei.html' //目标请求访问页面

let arrParse = str.split('/')

let remain = arrParse.slice(arrParse.length - 2, arrParse.length)

let filePath = path.join(__dirname, ...remain)

console.log(filePath)

let fs = require('fs')

fs.readFile(filePath, { flag: 'r', encoding: 'utf-8' }, function(err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})

//获取当前文件绝对路径
let curpath = __filename

let info3 = path.extname(curpath)

console.log(info3)

//解析路径
console.log(path.parse(__filename))