import { memo } from 'react';
import { TasksHeader, TasksHeaderRight } from '@/components/features/Tasks';
import type { FlexProps } from '@/components/ui/flex';
import { Skeleton } from '@/components/ui/skeleton';

type Props = FlexProps;

const BUTTON_HEIGHT = '28px';
export const SkeletonBoardHeader = memo(function SkeletonBoardHeader(
  props: Props,
) {
  return (
    <TasksHeader
      h="40px"
      boxShadow="sm"
      borderBottom={1}
      borderStyle="solid"
      borderColor="border"
      alignItems="center"
      {...props}
    >
      <TasksHeaderRight ml="auto">
        <Skeleton h={BUTTON_HEIGHT} w="126px" />
        <Skeleton h={BUTTON_HEIGHT} w="57px" />
        <Skeleton h={BUTTON_HEIGHT} w="91px" />
      </TasksHeaderRight>
    </TasksHeader>
  );
});
