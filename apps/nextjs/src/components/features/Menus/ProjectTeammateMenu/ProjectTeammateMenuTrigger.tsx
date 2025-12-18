import { memo, type PropsWithChildren } from 'react';
import { PopoverTrigger } from '@/components/ui/Popover';

type Props = PropsWithChildren;

export const ProjectTeammateMenuTrigger = memo(
  function ProjectTeammateMenuTrigger(props: Props) {
    return <PopoverTrigger>{props.children}</PopoverTrigger>;
  },
);
