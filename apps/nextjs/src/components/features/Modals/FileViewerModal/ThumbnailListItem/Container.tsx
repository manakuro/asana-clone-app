import { Tooltip } from '@/components/ui/Tooltip';
import type React from 'react';

type Props = {
  label: string;
};

export const Container: React.FCWithChildren<Props> = (props) => {
  return (
    <Tooltip
      hasArrow
      label={props.label}
      aria-label="Attachment file name"
      size="sm"
      withIcon
    >
      {props.children}
    </Tooltip>
  );
};
