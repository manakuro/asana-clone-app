import { useWorkspaceActivityTaskIds } from '@/components/features/Inbox/hooks';
import { Flex, type FlexProps } from '@/components/ui/Flex';
import { useRouter } from '@/router';
import type React from 'react';
import { memo, useCallback, useMemo } from 'react';

type Props = FlexProps & {
  workspaceActivityId: string;
};

export const ClickHandler = memo(function ClickHandler(props: Props) {
  const { workspaceActivityId } = props;
  const { taskIds } = useWorkspaceActivityTaskIds(workspaceActivityId);
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
