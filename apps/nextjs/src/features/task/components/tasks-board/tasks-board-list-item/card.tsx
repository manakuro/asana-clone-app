import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { Collapsible } from '@/components/ui/collapsible';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useTasksRouter } from '@/features/task/hooks';
import { useTask } from '@/store/entities/task';
import { transitions } from '@/styles/transitions';
import { useTasksBoardListItemContext } from './provider';

type Props = FlexProps & {
  taskId: string;
};
export const Card = memo(function Card(props: Props) {
  const { isOpening } = useTasksBoardListItemContext();

  return (
    <Collapsible.Root defaultOpen open={isOpening}>
      <Collapsible.Content>
        <Component {...props} />
      </Collapsible.Content>
    </Collapsible.Root>
  );
});

const Component: React.FC<Props> = memo<Props>((props) => {
  const { taskId, ...rest } = props;
  const { ref, selected } = useTasksBoardListItemContext();
  const { navigateToTaskDetail } = useTasksRouter();
  const { task } = useTask(taskId);
  const style = useMemo(
    (): FlexProps => ({
      ...(task.completed ? { opacity: 0.6 } : {}),
      ...(selected ? { bg: 'teal.100', borderColor: 'teal.400' } : {}),
    }),
    [selected, task.completed],
  );
  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      navigateToTaskDetail(taskId);
    },
    [navigateToTaskDetail, taskId],
  );

  return (
    <Flex
      ref={ref}
      flexDirection="column"
      w="full"
      bg="white"
      border={1}
      borderStyle="solid"
      borderColor="border"
      borderRadius="md"
      mt={2}
      _hover={{
        borderColor: 'gray.300',
        boxShadow: 'sm',
      }}
      cursor="pointer"
      transition={transitions.base()}
      p={4}
      onClick={handleClick}
      position="relative"
      {...style}
      {...rest}
    />
  );
});
