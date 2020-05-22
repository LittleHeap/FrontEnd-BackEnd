let request = require('request');
let { fsWrite, fsDir } = require('./myfs.js');

let httpUrl = 'https://www.1905.com/vod/list/n_1/o3p1.html'

function req(url) {
    return new Promise(function(resolve, reject) {
        request.get(url, function(error, response, body) {
            if (error) {
                reject(error)
            } else {
                resolve({ response, body })
            }
        })
    })
}

//获取
async function getClassUrl() {
    //获取body
    let { response, body } = await req(httpUrl);
    // console.log(body)

    //正则化提取类别条目信息
    let reg = /<span class="search-index-L">类型(.*?)<div class="grid-12x">/igs;
    let result = reg.exec(body)[1];
    //console.log(result);

    //继续正则提取类别页面
    let arrClass = [];
    let reg1 = /<a href="javascript:void\(0\);" onclick="location.href='(.*?)';return false;".*? >(.*?)<\/a>/igs;
    var res;
    while (res = reg1.exec(result)) {
        let obj = {
            className: res[2],
            url: res[1]
        };
        arrClass.push(obj);
        await fsDir('./Movies/' + res[2]);
        //异步函数解析类别页面的电影链接
        getMovies(res[1], res[2])
    };
    console.log(arrClass)
}

//解析电影名称和链接函数
async function getMovies(url, type) {
    //获取body
    let { response, body } = await req(url);
    //正则提取信息
    let reg = /<a class="pic-pack-outer" target="_blank" href="(.*?)" title="(.*?)"><img/igs;
    let arrList = [];
    var res;
    while (res = reg.exec(body)) {
        let obj = {
            movieName: res[2],
            movieLink: res[1]
        };
        arrList.push(obj);
        // arrList.push(res[1])
        parsePage(res[1], type);
    }
    // console.log(type);
    // console.log(arrList);
}

//解析电影详情介绍函数
async function parsePage(url, type) {
    //获取body
    let { response, body } = await req(url);
    //正则提取信息
    let reg = /<h1 class="playerBox-info-name playerBox-info-cnName">(.*?)<\/h1>.*? id="playerBoxIntroCon">(.*?)<a.*?导演.*?title="(.*?)" data-hrefexp=/igs;
    let res = reg.exec(body);
    let movie = {
        name: res[1],
        intro: res[2],
        director: res[3],
        url: url,
        type: type
    };
    console.log(movie);
    let strMovie = JSON.stringify(movie);
    fsWrite('./Movies/' + type + '/' + res[1] + '.json', strMovie);
}

getClassUrl()