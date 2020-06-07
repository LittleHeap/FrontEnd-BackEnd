const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs');
const path = require('path');

var httpUrl = 'https://www.doutula.com/article/list/?page=';

// 封装延迟函数
async function myWait(milliSecondes) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("Delay : " + milliSecondes);
        }, milliSecondes);
    });
}

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
    allPageNum = 3; //这里不请求那么多页
    for (let i = 1; i <= allPageNum; i++) {
        await myWait(5000);
        // getListPage(i);
        console.log('mark');
    }
}

spider();