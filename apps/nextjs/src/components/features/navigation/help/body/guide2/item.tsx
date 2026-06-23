import type { Item } from '@/components/features/navigation/help/body/guide-list-item';
import { SeeMore } from './see-more';

export const guide2Item: Item = {
  id: 2,
  number: 2,
  title: 'Tips for tasks and projects',
  src: 'https://www.dailymotion.com/video/x5e9eog',
  description:
    'Mastering tasks and projects first will help you get the most out of our app, faster.',
  icon: {
    name: 'checkCircle',
    color: 'white',
  },
  iconDone: {
    name: 'checkCircleFilled',
    color: 'teal.200',
  },
  done: false,
  time: '3 min read',
  seeMoreComponent: <SeeMore />,
};
