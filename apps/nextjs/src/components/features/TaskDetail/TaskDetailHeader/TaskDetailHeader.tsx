import { memo, useMemo } from 'react';
import { useTaskDetail } from '@/components/features/TaskDetail';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Skeleton } from '@/components/ui/skeleton';
import { Stack } from '@/components/ui/stack';
import type { IconType } from '@/shared/icons';
import { Attachment } from './Attachment';
import { Complete } from './Complete';
import { Copy } from './Copy';
import { Like } from './Like';
import { MoreAction } from './MoreAction';
import { SubTasks } from './Subtasks';

type Props = {
  mode?: Mode;
  onClose?: () => void;
  loading?: boolean;
} & FlexProps;

const closeIcons = {
  modal: 'x',
  drawer: 'arrowToRight',
} as const;
type Mode = keyof typeof closeIcons;

export const TaskDetailHeader = memo(function TaskDetailHeader(props: Props) {
  const { mode, onClose, loading, ...rest } = props;
  const { taskId } = useTaskDetail();

  const closeIcon = useMemo<IconType>(
    () => closeIcons[mode ?? 'modal'],
    [mode],
  );

  if (loading)
    return (
      <Flex px={6} h="57px" alignItems="center" flex={1}>
        <Skeleton h="28px" w="117px" />
        <Skeleton h="28px" w="212px" ml="auto" />
      </Flex>
    );

  return (
    <Flex px={6} h="57px" alignItems="center" flex={1} {...rest}>
      <Flex flex={1}>
        <Complete taskId={taskId} />
      </Flex>
      <Flex>
        <Stack gap={1} direction="row">
          <Like />
          <Attachment />
          <SubTasks taskId={taskId} />
          <Copy taskId={taskId} />
          <MoreAction taskId={taskId} />
          {onClose && (
            <IconButton
              aria-label="Close button"
              variant="ghost"
              onClick={onClose}
              size="sm"
            >
              <Icon icon={closeIcon} color="fg.muted" />
            </IconButton>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
});
