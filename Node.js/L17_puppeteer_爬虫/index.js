const puppeteer = require('puppeteer');
const axios = require('axios');

async function test1() {
    // 启动浏览器，headless设置是否有界面
    let options = {
        defaultViewport: {
            width: 1400,
            height: 800
        },
        headless: false
    };
    let browser = await puppeteer.launch(options);
    // 打开页面
    let page = await browser.newPage();
    // 访问网站
    await page.goto('https://www.dytt8.net/index.htm');
    // 截屏
    // await page.screenshot({ path: 'screenshot.png' });
    // 获取页面内容
    let elements = await page.$$eval('#menu li a', (elements) => {
        let eles = [];
        elements.forEach(function(item, i) {
            // 这样会在浏览器的控制台输出
            if (item.getAttribute('href') != '#') {
                // console.log(item.innerHTML);
                let eleObj = {
                    href: item.getAttribute('href'),
                    text: item.innerText
                }
                eles.push(eleObj);
                // console.log(eleObj);
            }
        });
        return eles;
    });

    // 监听console.log()
    // page.on('console', function(eventMsg) {
    //     console.log(eventMsg.text());
    // });

    console.log(elements);

    // 进入国内电影页面
    let gnPage = await browser.newPage();
    await gnPage.goto(elements[2].href);
};

// test1();

async function test2() {
    // 启动浏览器，headless设置是否有界面
    let options = {
        defaultViewport: {
            width: 1400,
            height: 800
        },
        headless: false
    };
    let browser = await puppeteer.launch(options);
    // 打开页面
    let page = await browser.newPage();
    // 访问网站
    await page.goto('https://www.dytt8.net/index.htm');
    // 获取页面对象
    let eleHandle = await page.$$('#menu li a');
    console.log(eleHandle.length);
    await eleHandle[5].click(); // 第一次广告页
    await eleHandle[5].click();
};

// test2();

async function test3() {
    let options = {
        defaultViewport: {
            width: 1400,
            height: 800
        },
        headless: false
    };
    let browser = await puppeteer.launch(options);
    let page = await browser.newPage();
    await page.goto('https://www.dytt8.net/index.htm');
    let search = await page.$('.searchl .formhue');
    // 输入框光标聚焦
    await search.focus();
    // 输入框输入内容
    await page.keyboard.type('小丑');
    // 冒泡广告页
    await page.$eval('.searchr', (element) => {
        element.addEventListener('click', function(event) {
            event.cancelBubble = true;
        })
    });
    // 点击搜索按钮
    let btn = await page.$('.searchr input[name="Submit"]');
    await btn.click();
}

test3();