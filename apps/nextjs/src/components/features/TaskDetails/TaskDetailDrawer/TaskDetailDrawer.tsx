import { useTaskDetail } from '@/components/features/TaskDetail';
import { Slide } from '@/components/ui/Slide';
import type { UseClickOutsideOptionsHasClickedOutside } from '@/hooks/useClickOutside';
import type { Ref } from 'react';
import { memo, useCallback } from 'react';
import { Content } from './Content';
import { useTaskDetailDrawer } from './useTaskDetailDrawer';
import { useTaskDetailDrawerRef } from './useTaskDetailDrawerRef';

type Props = {
  backToPage: () => void;
  hasClickedOutside: UseClickOutsideOptionsHasClickedOutside;
};

export const TaskDetailDrawer = memo(function TaskDetailDrawer(props: Props) {
  const { hasClickedOutside, backToPage } = props;
  const { isOpen, onClose } = useTaskDetailDrawer();
  const { loading } = useTaskDetail();
  const { ref } = useTaskDetailDrawerRef();

  const handleClose = useCallback(() => {
    backToPage();
    // Execute onClose after the pathname changes to detect URL params.
    setTimeout(() => {
      onClose();
    }, 100);
  }, [backToPage, onClose]);

  return (
    <Slide
      ref={ref as Ref<HTMLDivElement>}
      in={isOpen}
      direction="right"
      transition={{
        enter: { duration: 0.2 },
        exit: { duration: 0.1 },
      }}
      style={{
        width: '42rem',
        minHeight: '100vh',
        height: '100%',
        zIndex: 1400,
        overflowY: 'scroll',
        pointerEvents: 'auto',
      }}
    >
      {isOpen && (
        <Content
          loading={loading}
          onClose={handleClose}
          hasClickedOutside={hasClickedOutside}
        />
      )}
    </Slide>
  );
});
