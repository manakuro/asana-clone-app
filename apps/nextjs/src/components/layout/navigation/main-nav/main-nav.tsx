import { memo } from 'react';
import { List } from '@/components/ui/list';
import { MAX_WIDTH } from '../navigation';
import { Goals } from './goals';
import { Home } from './home';
import { Inbox } from './inbox';
import { MyTasks } from './my-tasks';
import { Portfolios } from './portfolios';

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
