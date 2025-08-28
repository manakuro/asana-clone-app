import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useWorkspaceActivity } from '@/store/app/inbox/activity';
import { memo } from 'react';
import { Container } from '../Container';
import { ActionButtons } from './ActionButtons';
import { ClickHandler } from './ClickHandler';
import { InfoText } from './InfoText';
import { Project } from './Project';
import { TaskList } from './TaskList';
import { Workspace } from './Workspace';

type Props = FlexProps & {
  workspaceActivityId: string;
};

export const WorkspaceActivity = memo(function WorkspaceActivity(props: Props) {
  const { workspaceActivityId } = props;
  const { workspaceActivity } = useWorkspaceActivity(workspaceActivityId);

  return (
    <Container>
      <ClickHandler workspaceActivityId={workspaceActivityId}>
        <Flex py={4} flex={1} flexDirection="column" maxW="inherit">
          <Workspace />
          <Project projectId={workspaceActivity.projectId} />
          <InfoText workspaceActivityId={workspaceActivityId} />
          <TaskList workspaceActivityId={workspaceActivityId} />
        </Flex>
      </ClickHandler>
      <ActionButtons />
    </Container>
  );
});
