let url = require('url');

//输出url库对象的功能
console.log(url);

//（1）url解析
var httpUrl = 'https://sale.vmall.com/hwmate.html?cid=10602';
var urlObj = url.parse(httpUrl);
console.log(urlObj);
/**
 * Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'sale.vmall.com',
  port: null,
  hostname: 'sale.vmall.com',
  hash: null,
  search: '?cid=10602',
  query: 'cid=10602',
  pathname: '/hwmate.html',
  path: '/hwmate.html?cid=10602',
  href: 'https://sale.vmall.com/hwmate.html?cid=10602'
}
 */


//（2）url合成
var targetUrl = 'http://www.taobao.com/';
httpUrl = './sxt/qianduan/laochen.html';
var urlRes = url.resolve(targetUrl, httpUrl);
console.log(urlRes);
//http://www.taobao.com/sxt/qianduan/laochen.html