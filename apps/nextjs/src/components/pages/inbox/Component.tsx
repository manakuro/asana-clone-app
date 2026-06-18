'use client';

import React, { memo, useCallback } from 'react';
import { MainHeader } from '@/components/features/MainHeader';
import { Flex } from '@/components/ui/flex';
import { Head } from '@/components/ui/head';
import { TabPanel, Tabs } from '@/components/ui/tabs';
import { useRouter } from '@/router';
import { Activity } from './components/Activity';
import { Archive } from './components/Archive';
import { Header } from './components/Header';
import { Provider, useInboxPageContext } from './providers/Provider';

const ACTIVITY_INDEX = 'activity' as const;
const ARCHIVE_INDEX = 'archive' as const;

type Index = typeof ACTIVITY_INDEX | typeof ARCHIVE_INDEX;

export const Component = memo(function InboxComponent() {
  return (
    <Provider>
      <WrappedComponent />
    </Provider>
  );
});

const WrappedComponent = memo(function WrappedInboxComponent() {
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
    async (index: string) => {
      switch (index as Index) {
        case ACTIVITY_INDEX: {
          setLoading();
          await navigateToInbox();
          setTabIndex(ACTIVITY_INDEX);

          break;
        }
        case ARCHIVE_INDEX: {
          setLoading();
          await navigateToInbox();
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
    >
      <Flex data-testid="Inbox" flex={1} flexDirection="column" maxW="full">
        <Head title="inbox" />
        <MainHeader>
          <Header />
        </MainHeader>
        <Flex flex={1}>
          <Flex flex={1}>
            <TabPanel value="activity">
              <Activity />
            </TabPanel>
            <TabPanel value="archive">
              <Archive />
            </TabPanel>
          </Flex>
        </Flex>
      </Flex>
    </Tabs>
  );
});
