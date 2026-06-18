import type { Ref } from 'react';
import { memo, useEffect } from 'react';
import {
  useTaskDetail,
  useTaskDetailResetScrollId,
} from '@/components/features/TaskDetail';
import { Flex } from '@/components/ui/flex';
import { Form } from './Form';
import { Info } from './Info';
import { SkeletonTaskDetailBody } from './SkeletonTaskDetailBody';
import { useTaskDetailBodyRef } from './useTaskDetailBodyRef';

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
