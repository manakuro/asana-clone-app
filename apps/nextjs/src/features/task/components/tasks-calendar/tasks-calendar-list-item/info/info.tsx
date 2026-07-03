import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useTasksContext } from '@/features/task/components/tasks-provider/tasks-context';
import { ProjectDueInfo } from './project-due-info';

type Props = {
  dateString: string;
} & FlexProps;

export const Info = memo(function Info(props: Props) {
  const { dateString } = props;
  const { isProjectsPage } = useTasksContext();

  if (isProjectsPage)
    return (
      <Flex ml="auto">
        <ProjectDueInfo dateString={dateString} />
      </Flex>
    );

  return null;
});
