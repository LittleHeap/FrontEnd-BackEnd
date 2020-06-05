const axios = require("axios");
const fs = require("fs");

async function getPage(num) {
    let httpUrl = 'http://www.app-echo.com/api/recommend/sound-day?page=' + num;
    let res = await axios.get(httpUrl);
    let data = res.data;
    data.list.forEach(function(item, i) {
        let title = item.sound.name;
        let mp3Url = item.sound.source;
        // console.log(title);
        // console.log(mp3Url);
        download(title, mp3Url);
    });
}

async function download(title, mp3Url) {
    let res = await axios.get(mp3Url, { responseType: 'stream' });
    let ws = fs.createWriteStream('./mp3/' + title + '.mp3')
    res.data.pipe(ws);
    res.data.on('close', function() {
        ws.close();
    });
}

getPage(1);