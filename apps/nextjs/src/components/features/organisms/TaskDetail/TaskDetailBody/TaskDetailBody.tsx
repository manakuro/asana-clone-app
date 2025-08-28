import { useTaskDetail } from '@/components/features/organisms/TaskDetail';
import { Flex } from '@/components/ui/atoms';
import type React from 'react';
import type { Ref } from 'react';
import { memo, useEffect } from 'react';
import { Form } from './Form';
import { Info } from './Info';
import { SkeletonTaskDetailBody } from './SkeletonTaskDetailBody';
import { useTaskDetailBody } from './useTaskDetailBody';

type Props = {
  isMakePublic?: boolean;
  loading?: boolean;
};

export const TaskDetailBody: React.FC<Props> = memo<Props>((props) => {
  const { ref } = useTaskDetailBody();
  const { scrollId, taskId, resetScrollId } = useTaskDetail();

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
TaskDetailBody.displayName = 'TaskDetailBody';
