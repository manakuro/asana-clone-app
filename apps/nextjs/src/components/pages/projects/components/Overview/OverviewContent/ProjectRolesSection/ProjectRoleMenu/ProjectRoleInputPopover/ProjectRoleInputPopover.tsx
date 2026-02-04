import type { UsePopoverProps } from '@chakra-ui/react';
import { type PropsWithChildren, useRef } from 'react';
import { Flex } from '@/components/ui/Flex';
import {
  Popover,
  type PopoverProps,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { PortalManager } from '@/components/ui/PortalManager';
import { Content } from './Content';

type Props = PopoverProps & {
  onClose: () => void;
  projectId: string;
  projectTeammateId: string;
  isOpen: boolean;
};

export function ProjectRoleInputPopover(props: PropsWithChildren<Props>) {
  const { children, isOpen, onClose, projectId, projectTeammateId, ...rest } =
    props;
  const initialFocusRef = useRef<HTMLInputElement | null>(null);

  return (
    <PortalManager zIndex={1500}>
      <Popover
        isLazy
        placement="bottom-start"
        isOpen={isOpen}
        initialFocusRef={initialFocusRef as UsePopoverProps['initialFocusRef']}
        {...rest}
      >
        <PopoverTrigger>
          <Flex>{children}</Flex>
        </PopoverTrigger>
        {isOpen && (
          <Content
            isOpen={isOpen}
            onClose={onClose}
            projectId={projectId}
            projectTeammateId={projectTeammateId}
            initialFocusRef={initialFocusRef}
          />
        )}
      </Popover>
    </PortalManager>
  );
}
