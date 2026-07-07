import { memo } from 'react';
import { useWorkspaceActivity } from '@/components/pages/inbox/store/activity';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Container } from '../container';
import { ActionButtons } from './action-buttons';
import { ClickHandler } from './click-handler';
import { InfoText } from './info-text';
import { Project } from './project';
import { TaskList } from './task-list';
import { Workspace } from './workspace';

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
