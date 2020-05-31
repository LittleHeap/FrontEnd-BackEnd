const schedule = require('node-schedule');

// async function sleep() {
//     await setTimeout(function() {}, 5000);
// };

// // 当前时间的秒值为 10 时执行任务，如：2018-7-8 13:25:10
// let job = schedule.scheduleJob('10 * * * * *', () => {
//     console.log(new Date().toLocaleDateString());
// });
// console.log(new Date().toTimeString());

// sleep();

console.log(new Date().toLocaleDateString());
console.log(new Date().toLocaleTimeString());
console.log(new Date(new Date().getTime() - 3600000).toLocaleTimeString());
console.log(new Date(1000) < new Date(2000));

var start = "2020-05-30 19:00:00";
console.log(new Date().getTime() < new Date(start).getTime("2020-05-30 19:00:00"));