import { memo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
} from '@/features/tasks/components/tasks-header';

const BUTTON_HEIGHT = '28px';
export const SkeletonListHeader = memo(function SkeletonListHeader() {
  return (
    <TasksHeader>
      <TasksHeaderLeft>
        <Skeleton w="114px" h={BUTTON_HEIGHT} />
      </TasksHeaderLeft>
      <TasksHeaderRight>
        <Skeleton h={BUTTON_HEIGHT} w="126px" />
        <Skeleton h={BUTTON_HEIGHT} w="57px" />
        <Skeleton h={BUTTON_HEIGHT} w="91px" />
      </TasksHeaderRight>
    </TasksHeader>
  );
});
