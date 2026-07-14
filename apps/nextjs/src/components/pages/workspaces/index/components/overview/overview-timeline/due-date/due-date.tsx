import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { useTimelineStyle } from '../use-timeline-style';
import { ProjectDueDate } from './project-due-date';

type Props = {
  projectId: string;
};

export const DueDate = memo(function DueDate(props: Props) {
  const { projectId } = props;
  const { timelineBorderStyle } = useTimelineStyle();

  return (
    <Flex position="relative" pb={8} css={timelineBorderStyle}>
      <ProjectDueDate
        projectId={projectId}
        buttonStyle={{ ml: '-15px' }}
        iconStyle={{ size: 'xl', ml: '1px' }}
      />
    </Flex>
  );
});
