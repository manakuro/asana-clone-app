import { memo, useMemo } from 'react';
import { useInboxTaskDetail } from '@/components/features/inbox/hooks/use-inbox-task-detail';
import { Inbox } from '@/components/features/inbox/inbox';
import { InboxHeader } from '@/components/features/inbox/inbox-header';
import { InboxLeft } from '@/components/features/inbox/inbox-left';
import { InboxList } from '@/components/features/inbox/inbox-list';
import { InboxListContent } from '@/components/features/inbox/inbox-list-content';
import { InboxRight } from '@/components/features/inbox/inbox-right';
import { InboxSkeleton } from '@/components/features/inbox/inbox-skeleton';
import { TaskDetailSide } from '@/components/features/task-details/task-detail-side';
import { TasksProvider } from '@/components/features/tasks/tasks-provider/tasks-provider';
import { Flex } from '@/components/ui/flex';
import { useInboxArchivePageQuery } from '@/hooks/queries/app';
import { getInboxDetailId, isInboxDetailURL } from '@/router';
import { useInboxPageContext } from '../../providers/provider';

export const Archive = memo(function Archive() {
  return <Component />;
});

const Component = memo(function Component() {
  const { loadingTabContent } = useInboxPageContext();
  const { loading: loadingQuery } = useInboxArchivePageQuery();
  const loading = useMemo(
    () => loadingTabContent || loadingQuery,
    [loadingTabContent, loadingQuery],
  );

  useInboxTaskDetail({
    isTaskDetailURL: isInboxDetailURL,
    getTaskDetailId: getInboxDetailId,
    fetchQuery: async () => {},
  });

  if (loading) return <InboxSkeleton />;

  return (
    <TasksProvider isInboxPage>
      <Inbox isArchive>
        <InboxLeft>
          <InboxHeader />
          <InboxListContent>
            <Flex>
              <InboxList />
            </Flex>
          </InboxListContent>
        </InboxLeft>
        <InboxRight>
          <TaskDetailSide />
        </InboxRight>
      </Inbox>
    </TasksProvider>
  );
});
