import { memo, useMemo } from 'react';
import { useInboxTaskDetail } from '@/components/features/inbox/hooks/use-inbox-task-detail';
import { Inbox } from '@/components/features/inbox/inbox';
import {
  FilterButton,
  InboxHeader,
  InboxHeaderRight,
  MoreActionButton,
} from '@/components/features/inbox/inbox-header';
import { InboxLeft } from '@/components/features/inbox/inbox-left';
import { InboxList } from '@/components/features/inbox/inbox-list';
import { InboxListContent } from '@/components/features/inbox/inbox-list-content';
import { InboxRight } from '@/components/features/inbox/inbox-right';
import { InboxSkeleton } from '@/components/features/inbox/inbox-skeleton';
import { TaskDetailSide } from '@/components/features/task-details/task-detail-side';
import { TasksContext } from '@/components/features/tasks/tasks-provider/tasks-context';
import { Flex } from '@/components/ui/flex';
import { useInboxActivityPageQuery } from '@/hooks/queries/app';
import { getInboxDetailId, isInboxDetailURL } from '@/router';
import { useInboxPageContext } from '../../providers/context';

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
