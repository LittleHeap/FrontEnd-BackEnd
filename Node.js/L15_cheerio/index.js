//获取HTML文档的内容，内容的获取跟jquery一样
const cheerio = require("cheerio");
//获取axios对象
const axios = require("axios");
//获取fs文件对象
const fs = require('fs');
//获取path路径处理对象
const path = require('path');

let httpUrl = 'https://www.doutula.com/article/list/?page='

//获取页面总数
async function getNum() {
    let res = await axios.get(httpUrl);
    let $ = cheerio.load(res.data);
    let btnLength = $('.pagination li').length;
    let allNum = $('.pagination li').eq(btnLength - 2).find('a').text();
    return allNum;
}

async function spider() {
    let allPageNum = await getNum();
    //这里不请求那么多页
    allPageNum = 1;
    for (let i = 1; i <= allPageNum; i++) {
        getListPage(i);
    }
}

async function getListPage(pageNum) {
    let httpUrl = 'https://www.doutula.com/article/list/?page=' + pageNum;
    axios.get(httpUrl).then((res) => {
        //可以获取页面web信息
        //console.log(res.data);
        //cheerio解析html文档，获得一个$对象
        let $ = cheerio.load(res.data);
        //获取当前页面的所有表情页面的链接
        $('#home .col-sm-9>a').each((i, element) => {
            console.log(i);
            //获取图片类型名称
            let title = $(element).find('.random_title').text();
            let res = /(.*?)\d/igs;
            title = res.exec(title)[1];
            //创建对应文件夹
            fs.mkdir('./img/' + title, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('成功创建目录：' + './img/' + title);
                }
            });
            let pageUrl = $(element).attr('href');
            console.log(title);
            console.log(pageUrl);
            parsePage(pageUrl, title);
        })
    })
}

async function parsePage(url, title) {
    //返回.then的对象res
    let res = await axios.get(url);
    //解析页面
    let $ = cheerio.load(res.data);
    //爬取指定信息
    $('.pic-content img').each((i, element) => {
        let imgUrl = $(element).attr('src');
        console.log(imgUrl);
        //下载图片到本地
        //获取后缀名
        let extName = path.extname(imgUrl);
        //图片写入的路径和名字
        let imgPath = `./img/${title}/${i}${extName}`;
        //创建写入流
        let ws = fs.createWriteStream(imgPath);
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