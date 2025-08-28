import { useTaskActivityTaskIds } from '@/components/features/organisms/Inbox/hooks';
import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useRouter } from '@/router';
import type React from 'react';
import { memo, useCallback, useMemo } from 'react';

type Props = FlexProps & {
  taskActivityId: string;
};

export const ClickHandler = memo(function ClickHandler(props: Props) {
  const { taskActivityId } = props;
  const { taskIds } = useTaskActivityTaskIds(taskActivityId);
  const taskId = useMemo(() => taskIds[0], [taskIds]);
  const { navigateToInboxDetail } = useRouter();

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      await navigateToInboxDetail(taskId);
    },
    [navigateToInboxDetail, taskId],
  );

  return (
    <Flex flex={1} onClick={handleClick} maxW="full">
      {props.children}
    </Flex>
  );
});
