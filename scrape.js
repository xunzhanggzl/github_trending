const rq = require('request-promise');
const cheerio = require('cheerio');
const debug = require('debug')('repo:scrape');

const scrape = async (language) => {
  let url = `https://github.com/trending/${language}?since=monthly`;

  let options = {
    uri: url,
    transform(body) {
      return cheerio.load(body);
    }
  };

  const $ = await rq(options);
  let items = $("article.Box-row");
  let result = {};
  result[`${language}`] = [];

  items.each((i, item) => {
    let elem = $(item);
    let param = elem.find(".lh-condensed a").attr("href");
    let url = `https://github.com/${param}`;
    let owner = elem.find(".lh-condensed a span.text-normal").text().trim() + " ";
    let repo = elem.find(".lh-condensed a").text();
    repo = repo.split('/')[1].trim();
    let description = elem.find("p.col-9").text().trim();
    
    result[`${language}`].push({
      owner,
      repo,
      url,
      description
    });

    // debug(`repo：${owner} ${repo}`);
  });

  debug(`${language} to array finish`);
  return result;
}

module.exports = scrape;