let url = require('url')

//输出url库对象的功能
console.log(url)

//（1）url解析
let httpUrl = 'https://sale.vmall.com/hwmate.html?cid=10602'

let urlObj = url.parse(httpUrl)

console.log(urlObj)

//（2）url合成
let targetUrl = 'http://www.taobao.com/'

httpUrl = './sxt/qianduan/laochen.html'

let urlRes = url.resolve(targetUrl, httpUrl)

console.log(urlRes)