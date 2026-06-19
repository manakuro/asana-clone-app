import type React from 'react';
import { Tooltip } from '@/components/ui/tooltip';

type Props = {
  label: string;
};

export const Container: React.FCWithChildren<Props> = (props) => {
  return (
    <Tooltip
      content={props.label}
      aria-label="Attachment file name"
      size="sm"
      withIcon
      contentProps={{
        color: 'fg',
        bg: 'bg',
      }}
    >
      {props.children}
    </Tooltip>
  );
};
