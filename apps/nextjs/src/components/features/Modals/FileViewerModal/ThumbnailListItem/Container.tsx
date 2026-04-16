import type React from 'react';
import { Tooltip } from '@/components/ui/Tooltip';

type Props = {
  label: string;
};

export const Container: React.FCWithChildren<Props> = (props) => {
  return (
    <Tooltip
      showArrow
      content={props.label}
      aria-label="Attachment file name"
      size="sm"
      withIcon
    >
      {props.children}
    </Tooltip>
  );
};
