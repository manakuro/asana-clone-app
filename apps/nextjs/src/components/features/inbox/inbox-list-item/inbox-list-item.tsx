import { memo } from 'react';
import { useInboxListItem } from '@/components/features/inbox';
import type { FlexProps } from '@/components/ui/flex';
import { ActivityTypeCode } from '@/store/entities/activity-type';
import { Provider } from './provider';
import { TaskActivity } from './task-activity';
import { WorkspaceActivity } from './workspace-activity';

type Props = FlexProps & {
  listItemId: string;
};

export const InboxListItem = memo(function InboxListItem(props: Props) {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  );
});

const Component = memo(function Component(props: Props) {
  const { listItemId } = props;
  const { listItem } = useInboxListItem(listItemId);

  switch (listItem.type) {
    case ActivityTypeCode.Workspace:
      return <WorkspaceActivity workspaceActivityId={listItem.id} />;
    case ActivityTypeCode.Task:
      return <TaskActivity taskActivityId={listItem.id} />;
    default:
      return null;
  }
});
