import { memo, useMemo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Inbox } from '@/features/inbox/components/inbox';
import {
  FilterButton,
  InboxHeader,
  InboxHeaderRight,
  MoreActionButton,
} from '@/features/inbox/components/inbox-header';
import { InboxLeft } from '@/features/inbox/components/inbox-left';
import { InboxList } from '@/features/inbox/components/inbox-list';
import { InboxListContent } from '@/features/inbox/components/inbox-list-content';
import { InboxRight } from '@/features/inbox/components/inbox-right';
import { InboxSkeleton } from '@/features/inbox/components/inbox-skeleton';
import { useInboxTaskDetail } from '@/features/inbox/hooks/use-inbox-task-detail';
import { TaskDetailSide } from '@/features/task-details/components/task-detail-side';
import { TasksContext } from '@/features/tasks/components/tasks-provider/tasks-context';
import { getInboxDetailId, isInboxDetailURL } from '@/router';
import { useInboxActivityPageQuery } from '../../api/use-inbox-activity-page-query';
import { useInboxPageContext } from '../../contexts/context';

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
    <TasksContext isInboxPage>
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
    </TasksContext>
  );
});
