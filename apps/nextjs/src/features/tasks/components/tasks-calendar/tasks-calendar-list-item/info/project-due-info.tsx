import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useProjectDueDate } from '../hooks';

type Props = {
  dateString: string;
} & FlexProps;

export const ProjectDueInfo = memo(function ProjectDueInfo(props: Props) {
  const { dateString } = props;
  const { isProjectDueDate } = useProjectDueDate({ dateString });

  if (isProjectDueDate)
    return (
      <Flex fontSize="xs" fontWeight="medium" color="orange.400">
        Project Due
      </Flex>
    );

  return null;
});
