const mysql = require('mysql');
const { compileFunction } = require('vm');

var options = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '12345678',
    database: 'whatsbusy'
}

// 创建数据库链接对象
var connection = mysql.createConnection(options);

// 建立连接
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connect successfully');
    }
});

var strSql = 'select count(*) from temp';

connection.query(strSql, (err, results, fields) => {
    console.log(err);
    console.log(results);
    console.log(fields);
});