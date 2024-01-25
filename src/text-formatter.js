import { marked } from 'marked';
import { markedTerminal } from 'marked-terminal';
import chalk from 'chalk';


const mtOptions = {
  // Colors
  code: chalk.yellow,
  blockquote: chalk.gray.italic,
  html: chalk.gray,
  heading: chalk.green.bold,
  firstHeading: chalk.magenta.underline.bold,
  hr: chalk.reset,
  listitem: chalk.reset,
  table: chalk.reset,
  paragraph: chalk.white,
  strong: chalk.bold.white,
  em: chalk.italic,
  codespan: chalk.magenta,
  del: chalk.dim.gray.strikethrough,
  link: chalk.blue,
  href: chalk.blue.underline,


  // Reflow and print-out width
  width: 80, // only applicable when reflow is true
  reflowText: true,

  // Should it prefix headers?
  showSectionPrefix: false,

  // Whether or not to undo marked escaping
  // of enitities (" -> &quot; etc)
  unescape: true,

  // Whether or not to show emojis
  emoji: true,

  // Options passed to cli-table3
  tableOptions: {},

  // The size of tabs in number of spaces or as tab characters
  tab: 3 // examples: 4, 2, \t, \t\t

 
}

marked.use(markedTerminal(mtOptions));

export const formatter = (text) => marked.parse(text);




