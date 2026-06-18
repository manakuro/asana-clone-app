import { memo } from 'react';
import { List } from '@/components/ui/list';
import { MAX_WIDTH } from '../Navigation';
import { Goals } from './Goals';
import { Home } from './Home';
import { Inbox } from './Inbox';
import { MyTasks } from './MyTasks';
import { Portfolios } from './Portfolios';

export const MainNav = memo(function MainNav() {
  return (
    <List.Root w={MAX_WIDTH} mb={2}>
      <Home />
      <MyTasks />
      <Inbox />
      <Portfolios />
      <Goals />
    </List.Root>
  );
});
