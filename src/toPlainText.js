const markdownit = require('markdown-it');
const { convert } = require('html-to-text');

const md = markdownit();

function toText(markdownText) {
  const htmlText = md.render(markdownText);
  const text = convert(htmlText);
  return text;
}

module.exports = toText;