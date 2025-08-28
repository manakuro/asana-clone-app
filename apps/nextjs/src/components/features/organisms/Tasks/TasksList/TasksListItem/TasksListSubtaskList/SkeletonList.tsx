import { TasksListRow } from '@/components/features/organisms/Tasks';
import { Flex, Skeleton } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';

const TEXT_HEIGHT = '16px';

export const SkeletonList: React.FC = memo(() => {
  return (
    <Flex px={6} flex={1}>
      <Flex flex={1} flexDirection="column">
        <Flex flexDirection="column" ml={6}>
          {['40%', '32%', '38%'].map((w, i) => (
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
