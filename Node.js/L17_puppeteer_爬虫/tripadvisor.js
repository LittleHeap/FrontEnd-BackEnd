const puppeteer = require('puppeteer');
const fs = require('fs');

// 目标：获取TripAdvisor（New York）餐厅信息的链接

(async function() {
    // 目标网页
    let httpUrl = 'https://www.tripadvisor.com/Restaurants-g60763-New_York_City_New_York.html';
    // 浏览器配置项
    let debugOptions = {
        defaultViewport: {
            width: 1400,
            height: 800
        },
        headless: false,
        slowMo: 50
    };
    let testOptions = {
        headless: true
    };
    // 启动浏览器
    let browser = await puppeteer.launch(testOptions);
    // 获取餐厅列表总页数
    async function getAllNum() {
        let page = await browser.newPage();
        await page.goto(httpUrl);
        let res = await page.$$eval('.pageNumbers a:last-child', (elements) => {
            return elements[0].innerHTML;
        });
        page.close();
        return res.trim();
    }
    let num = await getAllNum();
    console.log(num);

    // num = 2;
    for (let i = 0; i < num; i++) {
        await pageList(i);
        console.log(i + 1);
    }

    // 写入csv函数
    async function fsWrite(path, content) {
        return new Promise(function(success, fail) {
            fs.writeFile(path, content, { flag: 'a', encoding: 'utf-8' }, function(err) {
                if (err) {
                    console.log('Data : ' + content + ' saved fail.');
                    fail(err);
                } else {
                    success(err);
                }
            })
        })
    };

    // 餐厅列表页面
    async function pageList(pageNum) {
        let listUrl = httpUrl.slice(0, 47) + 'oa' + pageNum * 30 + httpUrl.slice(46);
        let page = await browser.newPage();
        await page.goto(listUrl);
        let res = await page.$$eval('.restaurants-list-List__wrapper--3PzDL ._1llCuDZj .wQjYiB7z a', (elements) => {
            let eles = [];
            elements.forEach(function(item, i) {
                let eleObj = {
                    name: /.*?-Reviews-(.*?)-.*?/igs.exec(item.getAttribute('href'))[1],
                    href: 'https://www.tripadvisor.com' + item.getAttribute('href')
                }
                eles.push([eleObj.name.replace(/_/g, " "), eleObj.href]);
            });
            return eles;
        });
        page.close();
        res.forEach(function(item) {
            fsWrite('new_york.csv', [item[0], item[1]].join(',') + '\n');
            console.log(item);
        });
        return res;
    }

    // let restaurantList = await pageList(1);
    // console.log(restaurantList);


})()