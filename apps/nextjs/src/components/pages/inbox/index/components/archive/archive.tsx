import { memo, type PropsWithChildren, useMemo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Inbox } from '@/features/inbox/components/inbox';
import { InboxHeader } from '@/features/inbox/components/inbox-header';
import { InboxLeft } from '@/features/inbox/components/inbox-left';
import { InboxList } from '@/features/inbox/components/inbox-list';
import { InboxListContent } from '@/features/inbox/components/inbox-list-content';
import { InboxRight } from '@/features/inbox/components/inbox-right';
import { InboxSkeleton } from '@/features/inbox/components/inbox-skeleton';
import { TasksContext } from '@/features/task/components/tasks-provider/tasks-context';
import { useInboxArchivePageQuery } from '../../api/use-inbox-archive-page-query';
import { useInboxPageContext } from '../../contexts/context';

export const Archive = memo(function Archive({ children }: PropsWithChildren) {
  return <Component>{children}</Component>;
});

const Component = memo(function Component({ children }: PropsWithChildren) {
  const { loadingTabContent } = useInboxPageContext();
  const { loading: loadingQuery } = useInboxArchivePageQuery();
  const loading = useMemo(
    () => loadingTabContent || loadingQuery,
    [loadingTabContent, loadingQuery],
  );

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
        <InboxRight>{children}</InboxRight>
      </Inbox>
    </TasksContext>
  );
});
