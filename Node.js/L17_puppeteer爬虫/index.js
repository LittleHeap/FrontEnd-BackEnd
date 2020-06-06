const puppeteer = require('puppeteer');
const axios = require('axios');

async function test() {
    // 启动浏览器，headless设置是否有界面
    let options = {
        defaultViewport: {
            width: 1400,
            height: 800
        },
        headless: true
    };
    let browser = await puppeteer.launch(options);
    // 打开页面
    let page = await browser.newPage();
    // 访问网站
    await page.goto('https://www.dytt8.net/index.htm');
    // 截屏
    // await page.screenshot({ path: 'screenshot.png' });
    // 获取页面内容
    page.$$eval('#menu li a', (elements) => {
        elements.forEach(function(item, i) {
            // 这样会在浏览器的控制台输出，本地捕获需要监听
            console.log(item.innerHTML);
        });
    });
    // 监听console.log()
    page.on('console', function(data) {
        console.log(data._text);
    });
};

test();