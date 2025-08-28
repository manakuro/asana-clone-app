import { Flex } from '@/components/ui/atoms';
import type React from 'react';
import { Provider } from './Provider';

type Props = {
  onChange?: (currentIndex: number) => void;
  defaultIndex?: number;
};

export function Carousel(props: React.PropsWithChildren<Props>) {
  return (
    <Provider {...props}>
      <Component {...props} />
    </Provider>
  );
}

function Component(props: React.PropsWithChildren<Props>) {
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
