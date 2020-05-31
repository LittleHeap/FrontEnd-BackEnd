const request = require('request');

async function req(url) {
    return new Promise(function(resolve, reject) {
        request.get(url, function(error, response, body) {
            if (error) {
                reject(error);
            } else {
                resolve({ response, body });
            }
        })
    })
};

function getTimeStamp(t) {
    var mid = 0;
    var reg;
    var res;
    if (t.includes('week') | t.includes('month')) {
        // 超过一周直接返回8天让后面不做记录
        // '1 week ago' '1 week, 2 days ago' '2 months ago'
        return new Date(new Date().getTime() - 8 * 24 * 60 * 60 * 1000).getTime();
    } else if (t.includes('day')) {
        if (t.includes('hour')) {
            // '3 days, 15 hours ago'
            let day_i = t.indexOf('day');
            let dou = t.indexOf(',');
            let hour_i = t.indexOf('hour');
            mid += t.slice(0, day_i - 1) * 86400000 + t.slice(dou + 2, hour_i - 1) * 3600000;
        } else {
            // '3 days ago'
            let day_i = t.indexOf('day');
            mid += t.slice(0, day_i - 1) * 86400000;
        }
    } else if (t.includes('hour')) {
        if (t.includes('minute')) {
            // '3 hours, 20 minutes ago'
            let hour_i = t.indexOf('hour');
            let dou = t.indexOf(',');
            let min_i = t.indexOf('minute');
            mid += t.slice(0, hour_i - 1) * 3600000 + t.slice(dou + 2, min_i - 1) * 60000;
        } else {
            // '2 hours ago'
            let hour_i = t.indexOf('hour');
            mid += t.slice(0, hour_i - 1) * 3600000;
        }
    } else {
        // '2 minutes ago'
        let min_i = t.indexOf('minute');
        mid += t.slice(0, min_i - 1) * 60000;
    };
    return new Date(new Date().getTime() - mid).getTime();
};

async function getInfo(httpUrl) {
    console.log(httpUrl);
    let { response, body } = await req(httpUrl);
    let reg = /<h3 class="panel-title">Most recent submissions<\/h3>(.*?)<\/ul>/igs;
    let result = [];
    let part = reg.exec(body);
    let start = "2020-05-30 00:00:01";
    let end = "2020-05-30 23:59:59";
    let txt = '';
    if (part) {
        part = part[1];
        let info;
        reg = /<span class="badge" ng-class="getStatus\('10'\)">(.*?)<\/span>.*?<span class="badge progress-bar-info">(.*?)<\/span>.*?<b>(.*?)<\/b>.*?<span class="text-muted">(.*?)<\/span>/igs;
        let titles = [];
        while (info = reg.exec(part)) {
            if (!titles.includes(info[3].trim())) {
                titles.push(info[3].trim());
                let time_stamp = getTimeStamp(info[4].trim());
                if (time_stamp > new Date(start).getTime() && time_stamp < new Date(end).getTime()) {
                    var obj = {
                        title: info[3].trim(),
                        language: info[2].trim(),
                        status: info[1].trim(),
                        time: new Date(time_stamp).toLocaleDateString() + ' - ' + new Date(time_stamp).toLocaleTimeString()
                    }
                    result.push(obj);
                    console.log(obj.title + ' : ' + obj.time);
                    txt += info[3].trim() + ' : ' + new Date(time_stamp).toLocaleDateString() + ' - ' + new Date(time_stamp).toLocaleTimeString() + '\n';
                }
            };
        }
    }
    // console.log(result);
    // console.log(txt);
    // return txt;
    console.log(result.length);
    return result.length;
};

module.exports = { getInfo }