const fs = require('fs');
const path = require('path');

const write = (data, inputStr) => {
  const catalog = path.join(__dirname, '/2019');
  let filename = '';
  if (inputStr === 'M') {
    filename = accurateToMonth();
  } else {
    filename = accurateToDay()
  }
  fs.writeFileSync(`${catalog}/${filename}.md`, data, {
    'flag': 'a'
  }, (err) => {
    if (err) throw err;
  });
}

function accurateToDay() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}-${month}-${day}`;
}

function accurateToMonth() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  return `${year}-${month}`;
}

module.exports = write;