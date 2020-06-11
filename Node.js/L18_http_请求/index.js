const http = require('http');

// 创建server服务器对象
let server = http.createServer();

// 监听服务器请求
server.on('request', function(request, response) {
    // 当服务器被请求，会触发请求事件，并传入请求对象和响应对象
    // response.end('hello world');
    // 输出请求对象
    console.log(request);
    console.log(request.url);
    console.log(request.headers);
    // 设置response头部
    response.setHeader('Content-Type', 'text/html; charset=UTF-8');
    // 根据请求路径信息显示不同的页面内容
    if (request.url == '/') {
        response.end("<h1>主页</h1>")
    } else if (request.url == '/domestic') {
        response.end('Domestic News');
    } else {
        response.end('404');
    };
});

// 服务器监听的端口号
server.listen(3000, function() {
    // 启动监听端口号成功时触发回调函数
    console.log('Server Lunch!')

});