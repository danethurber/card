import boxen from 'boxen';
import chalk from 'chalk';

const LABEL_WIDTH = 8;
const COLUMN_GAP = 3;

export function render(data) {
  const accent = chalk.cyan;
  const bold = chalk.bold;
  const dim = chalk.dim;

  const label = (text) => accent(text.padEnd(LABEL_WIDTH));
  const formatRow = (key, value) => `${label(key)}${value}`;

  // Two-column contact layout: split links in half and zip
  const linkEntries = Object.entries(data.links);
  const half = Math.ceil(linkEntries.length / 2);
  const leftHalf = linkEntries.slice(0, half);
  const rightHalf = linkEntries.slice(half);

  const leftColumnWidth = Math.max(
    ...leftHalf.map(([k, v]) => k.padEnd(LABEL_WIDTH).length + v.length)
  ) + COLUMN_GAP;

  const pairedLinks = leftHalf.map(([lk, lv], i) => {
    const leftFormatted = formatRow(lk, lv);
    const visibleLeftLen = lk.padEnd(LABEL_WIDTH).length + lv.length;
    const padding = ' '.repeat(leftColumnWidth - visibleLeftLen);
    const right = rightHalf[i];
    const rightFormatted = right ? formatRow(right[0], right[1]) : '';
    return `${leftFormatted}${padding}${rightFormatted}`;
  });

  const visibleLength = (str) => str.replace(/\x1b\[[0-9;]*m/g, '').length;

  const bodyLines = [
    dim(`${data.title} · ${data.location}`),
    '',
    formatRow('Now', data.now.join(' · ')),
    '',
    formatRow('Stack', data.stack.join(' · ')),
    '',
    formatRow('Open', data.open),
    '',
    ...pairedLinks
  ];

  const cmdText = '$ npx danethurber';
  const maxWidth = Math.max(...bodyLines.map(visibleLength));
  const namePad = ' '.repeat(Math.max(1, maxWidth - data.name.length - cmdText.length));
  const nameLine = `${bold(data.name)}${namePad}${dim(cmdText)}`;

  const lines = [nameLine, ...bodyLines];

  return boxen(lines.join('\n'), {
    padding: 1,
    margin: 0,
    borderStyle: 'round',
    borderColor: 'gray'
  });
}
