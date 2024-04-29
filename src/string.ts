export const shortenString = (str: string | undefined | null, maxLength = 13): string => {
  if (!str) return '';
  const joiner = '...';
  if (str.length <= maxLength) return str;
  const pad = (maxLength - joiner.length) / 2;
  return str.substring(0, pad) + joiner + str.substring(str.length - pad);
};

export const truncateString = (str: string | undefined | null, maxLength = 50): string => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};

export function splitStringToLines(str: string, maxLineLength: number): string[] {
  const words = str.split(/\s+/).filter(Boolean);
  const lines = [];

  let currentLine = '';
  for (const word of words) {
    if (currentLine.length + word.length > maxLineLength && currentLine.length > 0) {
      lines.push(currentLine.trim());
      currentLine = '';
    }
    currentLine += word + ' ';
  }
  if (currentLine.length > 0) lines.push(currentLine.trim());

  return lines;
}
