let request = require('request');
let { fsWrite, fsDir } = require('./myfs.js');

//目标地址
let httpUrl = 'https://www.1905.com/vod/list/n_1/o3p1.html';

//request请求页面信息
function req(url) {
    return new Promise(function(resolve, reject) {
        request.get(url, function(error, response, body) {
            if (error) {
                reject(error);
            } else {
                // console.log(response);
                // console.log(body);
                resolve({ response, body });
            }
        })
    })
};

//获取数据
async function getClassUrl() {
    //获取body
    var { response, body } = await req(httpUrl);

    //正则化提取“类别信息”
    var reg = /<span class="search-index-L">类型 :<\/span>(.*?)<div class="grid-12x">/igs;
    var result = reg.exec(body)[1]; //这里取返回对象的属性1
    console.log(result); //获取到18个p标签信息

    //继续正则提取类别链接
    var arrClass = [];
    var reg = /<a href="javascript:void\(0\);" onclick="location.href='(.*?)';return false;" .*?>(.*?)<\/a>/igs;
    var res;
    while (res = reg.exec(result)) {
        var obj = {
            className: res[2],
            url: res[1]
        };
        arrClass.push(obj);
        //创建相应类别的文件夹
        await fsDir('./Movies/' + res[2]);
        //异步函数解析类别页面的电影链接
        getMovies(res[1], res[2])
    };
    console.log(arrClass)
};

//解析电影名称和链接函数
async function getMovies(url, type) {
    //获取body
    var { response, body } = await req(url);
    //正则提取信息
    var reg = /<a class="pic-pack-outer" target="_blank" href="(.*?)" title="(.*?)">/igs;
    var arrList = [];
    var res;
    while (res = reg.exec(body)) {
        let obj = {
            movieName: res[2],
            movieLink: res[1]
        };
        arrList.push(obj);
        //调用解析电影详情介绍函数
        parsePage(res[1], type);
    }
    console.log(type);
    console.log(arrList);
}

//解析电影详情介绍函数
async function parsePage(url, type) {
    //获取body
    let { response, body } = await req(url);
    //正则提取信息
    let reg = /<h1 class="playerBox-info-name playerBox-info-cnName">(.*?)<\/h1>.*? id="playerBoxIntroCon">(.*?)<a.*?导演.*?title="(.*?)" data-hrefexp=/igs;
    let res = reg.exec(body);
    let movieInfo = {
        name: res[1],
        intro: res[2],
        director: res[3],
        url: url,
        type: type
    };
    // console.log(movieInfo);
    let strMovie = JSON.stringify(movieInfo);
    fsWrite('./Movies/' + type + '/' + res[1] + '.json', strMovie);
}

getClassUrl();