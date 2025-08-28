import { List } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';
import { MAX_WIDTH } from '../Navigation';
import { Goals } from './Goals';
import { Home } from './Home';
import { Inbox } from './Inbox';
import { MyTasks } from './MyTasks';
import { Portfolios } from './Portfolios';

export const MainNav: React.FC = memo(() => {
  return (
    <List w={MAX_WIDTH} mb={2}>
      <Home />
      <MyTasks />
      <Inbox />
      <Portfolios />
      <Goals />
    </List>
  );
});
