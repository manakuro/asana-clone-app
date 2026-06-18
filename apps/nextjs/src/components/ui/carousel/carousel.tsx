import type { PropsWithChildren } from 'react';
import { Flex } from '@/components/ui/flex';
import { Provider } from './provider';

type Props = {
  onChange?: (currentIndex: number) => void;
  defaultIndex?: number;
};

export function Carousel(props: PropsWithChildren<Props>) {
  return (
    <Provider {...props}>
      <Component {...props} />
    </Provider>
  );
}

function Component(props: PropsWithChildren<Props>) {
  return (
    <Flex
      flex="1"
      overflow="hidden"
      position="relative"
      height="100%"
      flexDirection="column"
    >
      {props.children}
    </Flex>
  );
}
