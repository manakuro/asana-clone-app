import { useTasksContext } from '@/components/features/organisms/Tasks';
import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';
import { ProjectDueInfo } from './ProjectDueInfo';

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
