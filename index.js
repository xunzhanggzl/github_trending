const scrape = require('./scrape.js');
const write = require('./write.js');
const debug = require('debug')('repo:write');

(async () => {
  // 设置要爬取的语言
  let languages = ['python', 'javascript', 'css', 'java', 'go'];

  // 进行并行读取
  const resPromises = languages.map(language => {
    return scrape(language);
  })
  // resPromises是一个包含三个promise状态的数组
  for (let resPromise of resPromises) {
    // 按languages的顺序依次写入文件
    const res_obj = await resPromise;
    const key = Object.keys(res_obj)[0];
    const value = res_obj[`${key}`];

    debug(`开始写入${key}项目到文件`);

    const title = `# ${key}\n`;
    write(title);

    value.forEach((arr, index) => {
      let data = `${index+1}. [${arr.owner}${arr.repo}](${arr.url}):${arr.description}\n`;
      write(data);
    })

    debug(`写入${key}项目到文件完成`);
  }
  // 完毕后退出程序
  process.exit();
})();