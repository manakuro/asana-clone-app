import { title as mainTitle } from './title';

export const generateTitle = (title: string) => {
  return `${title} | ${mainTitle}`;
};
