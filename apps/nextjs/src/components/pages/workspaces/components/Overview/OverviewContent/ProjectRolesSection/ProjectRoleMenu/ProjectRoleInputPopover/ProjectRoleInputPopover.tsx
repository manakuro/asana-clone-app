import type { PropsWithChildren } from 'react';
import { useRef } from 'react';
import { Flex } from '@/components/ui/flex';
import { Popover, type PopoverRootProps } from '@/components/ui/popover';
import { Content } from './Content';

type Props = PopoverRootProps & {
  onClose: () => void;
  projectId: string;
  projectTeammateId: string;
  open: boolean;
};

export function ProjectRoleInputPopover(props: PropsWithChildren<Props>) {
  const { children, open, onClose, projectId, projectTeammateId, ...rest } =
    props;
  const initialFocusRef = useRef<HTMLInputElement | null>(null);

  return (
    <Popover.Root
      lazyMount
      positioning={{ placement: 'bottom-start' }}
      open={open}
      initialFocusEl={() => initialFocusRef.current}
      {...rest}
    >
      <Popover.Trigger asChild>
        <Flex>{children}</Flex>
      </Popover.Trigger>
      {open && (
        <Content
          open={open}
          onClose={onClose}
          projectId={projectId}
          projectTeammateId={projectTeammateId}
          initialFocusRef={initialFocusRef}
        />
      )}
    </Popover.Root>
  );
}
