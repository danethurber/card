import boxen from 'boxen';
import chalk from 'chalk';

const LABEL_WIDTH = 7;

export function render(data) {
  const accent = chalk.cyan;
  const bold = chalk.bold;
  const dim = chalk.dim;

  const label = (text) => accent(text.padEnd(LABEL_WIDTH));
  const indent = ' '.repeat(LABEL_WIDTH);

  const [firstNow, ...restNow] = data.now;
  const [firstStack, ...restStack] = data.stack;

  const lines = [
    bold(data.name),
    dim(`${data.title} · ${data.location}`),
    '',
    `${label('Now')}${firstNow}`,
    ...restNow.map((line) => `${indent}${line}`),
    '',
    `${label('Stack')}${firstStack}`,
    ...restStack.map((line) => `${indent}${line}`),
    '',
    `${label('Open')}${data.open}`,
    '',
    ...Object.entries(data.links).map(
      ([key, value]) => `${label(key)}${value}`
    )
  ];

  return boxen(lines.join('\n'), {
    padding: 1,
    margin: 0,
    borderStyle: 'round',
    borderColor: 'gray'
  });
}
