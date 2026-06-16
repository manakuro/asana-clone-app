import type { ComponentProps } from 'react';
import { chakra } from '@/shared/chakra';

type TimeProps = ComponentProps<typeof chakra.time>;

type Props = {
  seconds: number;
} & TimeProps;
export function Duration(props: Props) {
  return (
    <chakra.time
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontSize="xs"
      {...props}
      dateTime={`P${Math.round(props.seconds)}S`}
    >
      {format(props.seconds)}
    </chakra.time>
  );
}

const format = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
};

const pad = (str: number) => `0${str}`.slice(-2);
