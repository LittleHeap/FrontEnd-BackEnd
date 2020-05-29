var path = require('path');

// 解析扩展名
var strPath = 'res/file/index.html';
var res = path.extname(strPath);
console.log(res);
//.html

// 拼接路径
var arr = ['/root', 'qianduan', 'index'];
var res = path.resolve(...arr); //库函数要求...
console.log(res);
//root/qianduan/index

// 拼接路径
var cur = __dirname;
var res = path.join(cur, 'data', 'final');
console.log(res);
///Users/wangshaoyong/Desktop/FrontEnd-BackEnd/Node.js/L11_path_路径解析/data/final

// 解析网页请求路径
var str = 'http://www.baidu.com/views/news.html'; //目标请求访问页面
var arrParse = str.split('/');
console.log(arrParse); //[ 'http:', '', 'www.baidu.com', 'views', 'news.html' ]
var remain = arrParse.slice(arrParse.length - 2, arrParse.length);
console.log(remain); //[ 'views', 'news.html' ]
var filePath = path.join(__dirname, ...remain);
console.log(filePath);
//Users/wangshaoyong/Desktop/FrontEnd-BackEnd/Node.js/L11_path_路径解析/views/news.html

//读取解析后路径文件内容
var fs = require('fs')
fs.readFile(filePath, { flag: 'r', encoding: 'utf-8' }, function(err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data) //This is News!
    }
})

// 获取当前文件绝对路径
var curpath = __filename
console.log(curpath); //Users/wangshaoyong/Desktop/FrontEnd-BackEnd/Node.js/L11_path_路径解析/index.js
// 获取当前文件的扩展名
var res = path.extname(curpath);
console.log(res); //.js

//解析路径
console.log(path.parse(__filename));
/**
 * {
  root: '/',
  dir: '/Users/wangshaoyong/Desktop/FrontEnd-BackEnd/Node.js/L11_path_路径解析',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}
 */