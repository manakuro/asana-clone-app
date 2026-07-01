import type { Item } from '@/components/layout/navigation/help/body/guide-list-item';
import { SeeMore } from './see-more';

export const guide3Item: Item = {
  id: 3,
  number: 3,
  title: 'A better daily routine',
  src: 'https://vimeo.com/169599296',
  description:
    'My Tasks is a to-do list automatically populated by tasks assigned to you. No more sticky notes next to your desk or unread email systems.',
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
