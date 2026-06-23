import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Container } from '../container';
import { ActionButtons } from './action-buttons';
import { ClickHandler } from './click-handler';
import { TaskList } from './task-list';
import { Title } from './title';

type Props = FlexProps & {
  taskActivityId: string;
};

export const TaskActivity = memo(function TaskActivity(props: Props) {
  const { taskActivityId } = props;

  return (
    <Container>
      <ClickHandler taskActivityId={taskActivityId}>
        <Flex py={4} flex={1} flexDirection="column" maxW="inherit">
          <Title taskActivityId={taskActivityId} />
          <TaskList taskActivityId={taskActivityId} />
        </Flex>
      </ClickHandler>
      <ActionButtons />
    </Container>
  );
});
