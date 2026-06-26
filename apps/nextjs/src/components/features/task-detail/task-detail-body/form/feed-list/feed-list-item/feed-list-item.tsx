import { memo } from 'react';
import { Container } from './container';
import { Content } from './content';
import { Header } from './header';
import { Context } from './provider';

type Props = {
  taskFeedId: string;
  taskId: string;
  isPinned?: boolean;
};

export const FeedListItem = memo(function FeedListItem(props: Props) {
  return (
    <Context {...props}>
      <Component />
    </Context>
  );
});

const Component = memo(function Component() {
  return (
    <Container>
      <Header />
      <Content />
    </Container>
  );
});
