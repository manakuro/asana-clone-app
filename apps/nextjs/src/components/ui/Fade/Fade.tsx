import { Presence } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

type Props = {
  in?: boolean;
};

export function Fade(props: PropsWithChildren<Props>) {
  return (
    <Presence
      present={props.in}
      animationName={{
        _open: 'fade-in',
        _closed: 'fade-out',
      }}
      animationDuration="0.3s"
    >
      {props.children}
    </Presence>
  );
}
