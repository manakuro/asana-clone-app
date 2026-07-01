import type { Ref } from 'react';
import { memo, useEffect } from 'react';
import { Flex } from '@/components/ui/flex';
import {
  useTaskDetail,
  useTaskDetailResetScrollId,
} from '@/features/task-detail';
import { Form } from './form';
import { Info } from './info';
import { SkeletonTaskDetailBody } from './skeleton-task-detail-body';
import { useTaskDetailBodyRef } from './use-task-detail-body-ref';

type Props = {
  isMakePublic?: boolean;
  loading?: boolean;
};

export const TaskDetailBody = memo(function TaskDetailBody(props: Props) {
  const { ref } = useTaskDetailBodyRef({ loading: props.loading ?? false });
  const { resetScrollId } = useTaskDetailResetScrollId();
  const { scrollId, taskId } = useTaskDetail();

  useEffect(() => {
    if (props.loading) return;
    if (!scrollId) return;
    if (!ref.current) return;

    setTimeout(() => {
      const top =
        (document.getElementById(scrollId)?.offsetTop ?? 0) - (72 + 57);

      if (!ref.current) return;

      ref.current?.scrollTo({ top, behavior: 'smooth' });
      resetScrollId();
    });
  }, [props.loading, ref, resetScrollId, scrollId]);

  if (props.loading) return <SkeletonTaskDetailBody />;

  return (
    <Flex
      overflowY="scroll"
      flexDirection="column"
      ref={ref as Ref<HTMLDivElement>}
      flex={1}
    >
      <Info taskId={taskId} />
      <Form />
    </Flex>
  );
});
