import { PopoverTrigger } from '@/components/ui/organisms/Popover';
import { type PropsWithChildren, memo } from 'react';

type Props = PropsWithChildren;

export const ProjectTeammateMenuTrigger = memo(
  function ProjectTeammateMenuTrigger(props: Props) {
    return <PopoverTrigger>{props.children}</PopoverTrigger>;
  },
);
