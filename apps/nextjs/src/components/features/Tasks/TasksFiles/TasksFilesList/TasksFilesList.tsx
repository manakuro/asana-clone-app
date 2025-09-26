import { useTasksTaskFiles } from '@/components/features/Tasks/hooks';
import { Flex } from '@/components/ui/Flex';
import { Stack } from '@/components/ui/Stack';
import { useBreakpointValue } from '@/shared/chakra';
import { splitByNumber } from '@/shared/utils';
import { memo, useMemo } from 'react';
import { TasksFilesListItem } from '../TasksFilesListItem';

export const TasksFilesList = memo(function TasksFilesList() {
  const { taskFileIds } = useTasksTaskFiles();
  const splitNum = useBreakpointValue({ base: 2, '2xl': 3 }) as number;
  const sections = useMemo(
    () => splitByNumber(taskFileIds, splitNum),
    [taskFileIds, splitNum],
  );

  return (
    <Flex flex={1} pb={4}>
      <Stack maxW="90%" mx="auto" direction="row" spacing={8}>
        {sections.map((ids) => (
          <Stack spacing={8} key={ids.toString()}>
            {ids.map((id) => (
              <TasksFilesListItem taskFileId={id} key={id} />
            ))}
          </Stack>
        ))}
      </Stack>
    </Flex>
  );
});
