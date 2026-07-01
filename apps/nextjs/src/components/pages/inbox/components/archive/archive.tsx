import { memo, useMemo } from 'react';
import { Inbox } from '@/components/features/inbox/components/inbox';
import { InboxHeader } from '@/components/features/inbox/components/inbox-header';
import { InboxLeft } from '@/components/features/inbox/components/inbox-left';
import { InboxList } from '@/components/features/inbox/components/inbox-list';
import { InboxListContent } from '@/components/features/inbox/components/inbox-list-content';
import { InboxRight } from '@/components/features/inbox/components/inbox-right';
import { InboxSkeleton } from '@/components/features/inbox/components/inbox-skeleton';
import { useInboxTaskDetail } from '@/components/features/inbox/hooks/use-inbox-task-detail';
import { TaskDetailSide } from '@/components/features/task-details/task-detail-side';
import { TasksContext } from '@/components/features/tasks/tasks-provider/tasks-context';
import { Flex } from '@/components/ui/flex';
import { getInboxDetailId, isInboxDetailURL } from '@/router';
import { useInboxArchivePageQuery } from '../../api/queries/use-inbox-archive-page-query';
import { useInboxPageContext } from '../../contexts/context';

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
    <TasksContext isInboxPage>
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
    </TasksContext>
  );
});
