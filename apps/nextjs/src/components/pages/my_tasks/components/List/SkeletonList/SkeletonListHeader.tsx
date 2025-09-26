import {
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
} from '@/components/features/Tasks';
import { Skeleton } from '@/components/ui/Skeleton';
import { memo } from 'react';

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
