import type React from 'react';
import { memo } from 'react';
import { Container } from './Container';
import { Content } from './Content';
import { Header } from './Header';
import { Provider } from './Provider';

type Props = {
  taskFeedId: string;
  taskId: string;
  isPinned?: boolean;
};

export const FeedListItem = memo(function FeedListItem(props: Props) {
  return (
    <Provider {...props}>
      <Component />
    </Provider>
  );
});

const Component: React.FC = memo(() => {
  return (
    <Container>
      <Header />
      <Content />
    </Container>
  );
});
