import { getUrlParams } from './url.js';

export const twitterShareUrl = (text: string, url: string): string => {
  return `https://twitter.com/intent/tweet${getUrlParams({ text, url })}`;
};
