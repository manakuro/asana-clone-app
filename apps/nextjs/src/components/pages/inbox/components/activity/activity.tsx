import { memo, useMemo } from 'react';
import {
  FilterButton,
  Inbox,
  InboxHeader,
  InboxHeaderRight,
  InboxLeft,
  InboxList,
  InboxListContent,
  InboxRight,
  InboxSkeleton,
  MoreActionButton,
  useInboxTaskDetail,
} from '@/components/features/inbox';
import { TaskDetailSide } from '@/components/features/task-details/task-detail-side';
import { TasksProvider } from '@/components/features/tasks';
import { Flex } from '@/components/ui/flex';
import { useInboxActivityPageQuery } from '@/hooks/queries/app';
import { getInboxDetailId, isInboxDetailURL } from '@/router';
import { useInboxPageContext } from '../../providers/provider';

export const Activity = memo(function Activity() {
  return <Component />;
});

const Component = memo(function Component() {
  const { loadingTabContent } = useInboxPageContext();
  const { loading: loadingQuery } = useInboxActivityPageQuery();
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
      <Inbox isActivity>
        <InboxLeft>
          <InboxHeader>
            <InboxHeaderRight>
              <FilterButton />
              <MoreActionButton />
            </InboxHeaderRight>
          </InboxHeader>
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
