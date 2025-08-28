import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';
import { Container } from '../Container';
import { ActionButtons } from './ActionButtons';
import { ClickHandler } from './ClickHandler';
import { TaskList } from './TaskList';
import { Title } from './Title';

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
