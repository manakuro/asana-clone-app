import { memo, type PropsWithChildren } from 'react';
import { Popover } from '@/components/ui/popover';

type Props = PropsWithChildren;

export const ProjectTeammateMenuTrigger = memo(
  function ProjectTeammateMenuTrigger(props: Props) {
    return <Popover.Trigger asChild>{props.children}</Popover.Trigger>;
  },
);
