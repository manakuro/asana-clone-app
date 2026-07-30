import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useWorkspaceActivityTaskIds } from '@/features/inbox/hooks';
import { useRouterInbox } from '@/router/inbox';

type Props = FlexProps & {
  workspaceActivityId: string;
};

export const ClickHandler = memo(function ClickHandler(props: Props) {
  const { workspaceActivityId } = props;
  const { taskIds } = useWorkspaceActivityTaskIds(workspaceActivityId);
  const taskId = useMemo(() => taskIds[0], [taskIds]);
  const { navigateToInboxDetail } = useRouterInbox();

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
