import type { Item } from '@/components/layout/navigation/help/body/guide-list-item';
import { Detail } from './detail';

export const guide4Item: Item = {
  id: 4,
  number: 4,
  title: 'Additional resources',
  src: '',
  description:
    'From tiny tasks to big goals, we organizes work so teams are clear on ',
  icon: {
    name: 'copyAlt',
    color: 'white',
  },
  iconDone: {
    name: 'copyAlt',
    color: 'white',
  },
  done: false,
  time: '2 min read',
  detailComponent: <Detail />,
};
