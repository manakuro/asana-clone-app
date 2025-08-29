import { Flex, PortalManager } from '@/components/ui/atoms';
import {
  Popover,
  type PopoverProps,
  PopoverTrigger,
} from '@/components/ui/organisms/Popover';
import { useRef } from 'react';
import { Content } from './Content';

type Props = PopoverProps & {
  onClose: () => void;
  projectId: string;
  projectTeammateId: string;
  isOpen: boolean;
};

export function ProjectRoleInputPopover(props: Props) {
  const { children, isOpen, onClose, projectId, projectTeammateId, ...rest } =
    props;
  const initialFocusRef = useRef<HTMLInputElement | null>(null);

  return (
    <PortalManager zIndex={1500}>
      <Popover
        isLazy
        placement="bottom-start"
        isOpen={isOpen}
        initialFocusRef={initialFocusRef}
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
