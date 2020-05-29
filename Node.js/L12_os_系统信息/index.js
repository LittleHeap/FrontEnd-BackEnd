let os = require('os')

//获取CPU信息
console.log(os.cpus());
/**
 * [
  {
    model: 'Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 60537110, nice: 0, sys: 25243850, idle: 295474180, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 632450, nice: 0, sys: 678280, idle: 379935420, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 49442550, nice: 0, sys: 15277330, idle: 316528010, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 624360, nice: 0, sys: 583870, idle: 380037720, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 40595680, nice: 0, sys: 11843890, idle: 328807940, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 644800, nice: 0, sys: 520570, idle: 380080380, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 29365030, nice: 0, sys: 8495640, idle: 343386460, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 630150, nice: 0, sys: 445870, idle: 380169520, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 24387380, nice: 0, sys: 6557270, idle: 350302110, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 598540, nice: 0, sys: 387090, idle: 380259690, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 16328810, nice: 0, sys: 4414230, idle: 360503320, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 587360, nice: 0, sys: 334340, idle: 380323420, irq: 0 }
  }
]
 */

//获取内存信息
console.log(os.totalmem()); //34359738368

//获取cpu架构
console.log(os.arch()); //x64

//获取剩余内存量
console.log(os.freemem()); //2126266368

//获取平台信息
console.log(os.platform()); //darwin