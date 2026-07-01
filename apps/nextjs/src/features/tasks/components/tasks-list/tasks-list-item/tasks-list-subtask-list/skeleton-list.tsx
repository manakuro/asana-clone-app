import type React from 'react';
import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Skeleton } from '@/components/ui/skeleton';
import { TasksListRow } from '@/features/tasks/components/tasks-list/tasks-list-row/tasks-list-row';

const TEXT_HEIGHT = '16px';

export const SkeletonList: React.FC = memo(() => {
  return (
    <Flex px={6} flex={1}>
      <Flex flex={1} flexDirection="column">
        <Flex flexDirection="column" ml={6}>
          {['40%', '32%', '38%'].map((w, _i) => (
            <TasksListRow key={w} alignItems="center">
              <Skeleton h={TEXT_HEIGHT} w="20px" borderRadius="full" />
              <Skeleton h={TEXT_HEIGHT} w={w} ml={2} borderRadius="full" />
            </TasksListRow>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
});
