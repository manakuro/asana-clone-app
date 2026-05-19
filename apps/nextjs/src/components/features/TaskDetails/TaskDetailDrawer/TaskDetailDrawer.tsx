import { memo, useCallback, useEffect } from 'react';
import { useTaskDetail } from '@/components/features/TaskDetail';
import { Presence } from '@/components/ui/Presence';
import type { UseClickOutsideOptionsHasClickedOutside } from '@/hooks/useClickOutside';
import { Content } from './Content';
import { useTaskDetailDrawer } from './useTaskDetailDrawer';
import { useTaskDetailDrawerRef } from './useTaskDetailDrawerRef';

type Props = {
  backToPage: () => void;
  hasClickedOutside: UseClickOutsideOptionsHasClickedOutside;
};

export const TaskDetailDrawer = memo(function TaskDetailDrawer(props: Props) {
  const { hasClickedOutside, backToPage } = props;
  const { open, onClose } = useTaskDetailDrawer();
  const { loading } = useTaskDetail();
  const { ref } = useTaskDetailDrawerRef();

  const handleClose = useCallback(() => {
    backToPage();
    // Execute onClose after the pathname changes to detect URL params.
    setTimeout(() => {
      onClose();
    }, 100);
  }, [backToPage, onClose]);

  useEffect(() => {
    return () => {
      onClose();
    };
  }, [onClose]);

  return (
    <Presence
      ref={ref}
      present={open}
      animationName={{
        _open: 'slide-from-right-full',
        _closed: 'slide-to-right-full',
      }}
      animationDuration="0.2s"
      position="fixed"
      top="0"
      right="0"
      width="42rem"
      minHeight="100vh"
      height="100%"
      zIndex={1400}
      overflowY="scroll"
      pointerEvents="auto"
    >
      {open && (
        <Content
          loading={loading}
          onClose={handleClose}
          hasClickedOutside={hasClickedOutside}
        />
      )}
    </Presence>
  );
});
