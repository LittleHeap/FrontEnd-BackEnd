const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs');
const path = require('path');

var httpUrl = 'https://www.doutula.com/article/list/?page='

//获取页面总数
async function getNum() {
    var res = await axios.get(httpUrl);
    var $ = cheerio.load(res.data);
    var btnLength = $('.pagination li').length;
    //找到倒数第二个最后一页，定位a标签然后获取a标签的文本内容
    var allNum = $('.pagination li').eq(btnLength - 2).find('a').text();
    return allNum;
}

async function spider() {
    var allPageNum = await getNum();
    console.log(allPageNum); //656
    allPageNum = 1; //这里不请求那么多页
    for (let i = 1; i <= allPageNum; i++) {
        getListPage(i);
    }
}

async function getListPage(pageNum) {
    //重新拼接目标地址
    let httpUrl = 'https://www.doutula.com/article/list/?page=' + pageNum;
    //axios获取html数据
    var res = await axios.get(httpUrl);
    //cheerio解析html文档，获得一个$对象
    let $ = cheerio.load(res.data);
    //获取当前页面的所有表情页面的链接
    $('#home .col-sm-9>a').each((i, element) => {
        console.log(i);
        // console.log(element);
        // 获取图片类型名称
        var title = $(element).find('.random_title').text();
        var reg = /(.*?)\d/igs;
        title = reg.exec(title)[1];
        //创建对应文件夹
        fs.mkdir('./img/' + title, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('成功创建目录：' + './img/' + title);
            }
        });
        var pageUrl = $(element).attr('href');
        console.log(pageUrl);
        //继续进入链接下载图片
        parsePage(pageUrl, title);
    });
};

async function parsePage(url, title) {
    var res = await axios.get(url);
    let $ = cheerio.load(res.data);
    //爬取指定信息
    $('.pic-content img').each((i, element) => {
        var imgUrl = $(element).attr('src');
        // console.log(imgUrl);
        //下载图片到本地
        //获取后缀名
        var extName = path.extname(imgUrl);
        //图片写入的路径和名字
        var imgPath = `./img/${title}/${i}${extName}`;
        //创建写入流
        var ws = fs.createWriteStream(imgPath);
        //通过请求获取流数据，通过管道导入写入流
        axios.get(imgUrl, { responseType: 'stream' }).then(function(res) {
            res.data.pipe(ws);
            res.data.on('close', function() {
                ws.close();
            })
        });
    })
}

spider();