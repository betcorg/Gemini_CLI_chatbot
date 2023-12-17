const markdownit = require('markdown-it');
const terminal = require('markdown-it-terminal');

function formatter(markdownText) {
  const md = markdownit().use(terminal);
  return md.render(markdownText);
}

module.exports = formatter;