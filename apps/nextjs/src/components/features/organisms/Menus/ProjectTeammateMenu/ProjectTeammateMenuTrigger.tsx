import { PopoverTrigger } from '@/components/ui/organisms/Popover';
import type React from 'react';
import { type PropsWithChildren, memo } from 'react';

type Props = PropsWithChildren;

export const ProjectTeammateMenuTrigger: React.FC<Props> = memo<Props>(
  function ProjectTeammateMenuTrigger(props: Props) {
    return <PopoverTrigger>{props.children}</PopoverTrigger>;
  },
);
