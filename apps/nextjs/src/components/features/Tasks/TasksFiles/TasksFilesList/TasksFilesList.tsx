import { memo, useMemo } from 'react';
import { useTasksTaskFiles } from '@/components/features/Tasks/hooks';
import { Flex } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { useBreakpointValue } from '@/shared/chakra';
import { splitByNumber } from '@/shared/utils';
import { TasksFilesListItem } from '../TasksFilesListItem';
import { Empty } from './Empty';

export const TasksFilesList = memo(function TasksFilesList() {
  const { taskFileIds } = useTasksTaskFiles();
  const splitNum = useBreakpointValue({ base: 2, '2xl': 3 }) as number;
  const sections = useMemo(
    () => splitByNumber(taskFileIds, splitNum),
    [taskFileIds, splitNum],
  );

  if (!taskFileIds.length) {
    return <Empty />;
  }

  return (
    <Flex flex={1} pb={4}>
      <Stack maxW="90%" mx="auto" direction="row" gap={8}>
        {sections.map((ids) => (
          <Stack gap={8} key={ids.toString()}>
            {ids.map((id) => (
              <TasksFilesListItem taskFileId={id} key={id} />
            ))}
          </Stack>
        ))}
      </Stack>
    </Flex>
  );
});
