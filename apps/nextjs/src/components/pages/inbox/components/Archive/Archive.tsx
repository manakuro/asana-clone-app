import {
  Inbox,
  InboxHeader,
  InboxLeft,
  InboxList,
  InboxListContent,
  InboxRight,
  InboxSkeleton,
} from '@/components/features/Inbox';
import { useInboxTaskDetail } from '@/components/features/Inbox';
import { TaskDetailSide } from '@/components/features/TaskDetails';
import { TasksProvider } from '@/components/features/Tasks';
import { Flex } from '@/components/ui/Flex';
import { useInboxArchivePageQuery } from '@/hooks/queries/app';
import { getInboxDetailId, isInboxDetailURL } from '@/router';
import { memo, useMemo } from 'react';
import { useInboxPageContext } from '../../providers/Provider';

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
