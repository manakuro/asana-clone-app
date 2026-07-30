'use client';

import React, { memo, type ReactNode, useCallback } from 'react';
import { MainHeader } from '@/components/layout/main-header';
import { Flex } from '@/components/ui/flex';
import { Head } from '@/components/ui/head';
import { TabPanel, Tabs } from '@/components/ui/tabs';
import { useRouter } from '@/router';
import { Activity } from './components/activity';
import { Archive } from './components/archive';
import { Header } from './components/header';
import { Context, useInboxPageContext } from './contexts/context';

const ACTIVITY_INDEX = 'activity' as const;
const ARCHIVE_INDEX = 'archive' as const;

type Index = typeof ACTIVITY_INDEX | typeof ARCHIVE_INDEX;

type Props = {
  task?: ReactNode;
};

export const Page = memo(function InboxComponent({ task }: Props) {
  return (
    <Context>
      <InboxView task={task} />
    </Context>
  );
});

type InboxViewProps = {
  task: ReactNode;
};

const InboxView = memo(function InboxView({ task }: InboxViewProps) {
  const { setLoadingTabContent } = useInboxPageContext();
  const [tabIndex, setTabIndex] = React.useState<Index>(ACTIVITY_INDEX);
  const { navigateToInbox } = useRouter();

  const setLoading = useCallback(() => {
    setLoadingTabContent(true);
    setTimeout(() => {
      setLoadingTabContent(false);
    }, 200);
  }, [setLoadingTabContent]);

  const handleTabsChange = useCallback(
    (index: string) => {
      switch (index as Index) {
        case ACTIVITY_INDEX: {
          setLoading();
          navigateToInbox();
          setTabIndex(ACTIVITY_INDEX);

          break;
        }
        case ARCHIVE_INDEX: {
          setLoading();
          navigateToInbox();
          setTabIndex(ARCHIVE_INDEX);
          break;
        }
      }
    },
    [setLoading, navigateToInbox],
  );

  return (
    <Tabs
      value={tabIndex}
      onValueChange={(e) => handleTabsChange(e.value)}
      flex={1}
      display="flex"
      lazyMount
      unmountOnExit
    >
      <Flex data-testid="Inbox" flex={1} flexDirection="column" maxW="full">
        <Head title="inbox" />
        <MainHeader>
          <Header />
        </MainHeader>
        <Flex flex={1}>
          <Flex flex={1}>
            <TabPanel value="activity">
              <Activity task={task} />
            </TabPanel>
            <TabPanel value="archive">
              <Archive task={task} />
            </TabPanel>
          </Flex>
        </Flex>
      </Flex>
    </Tabs>
  );
});
