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

const Component = memo(function Component() {
  return (
    <Container>
      <Header />
      <Content />
    </Container>
  );
});
