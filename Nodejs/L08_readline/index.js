let readline = require('readline')

//实例化接口，传入一个对象参数，分别是input方式和outpu方式
var r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//question提问事件
// r1.question('What\'s your name?', function(answer){
//     console.log('Your name is ' + answer);
//     //r1.close();
// })

//Promise对连续question封装
function lcQuestion(title) {
    return new Promise(function(resolve, reject) {
        r1.question(title, function(answer) {
            resolve(answer);
        })
    })
}

async function packinfo() {
    let name = await lcQuestion('包名是什么？');
    let desc = await lcQuestion('包的描述是什么？');
    let main = await lcQuestion('主程序入口是什么？');

    let content = `{"name": "${name}", "desc": "${desc}", "main":"${main}"}`;
    console.log(content);

    r1.close();
}

packinfo();

//on结束事件
r1.on('close', function() {
    process.exit(0);
})