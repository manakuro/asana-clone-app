import { usePathname } from 'next/navigation';
import { memo, useCallback, useState } from 'react';
import { MainHeader } from '@/components/features/MainHeader';
import { Flex } from '@/components/ui/flex';
import { Head } from '@/components/ui/head';
import { TabPanel, Tabs } from '@/components/ui/tabs';
import {
  isWorkspacesCalendarURL,
  isWorkspacesMessageURL,
  isWorkspacesOverviewURL,
  useRouter,
} from '@/router';
import { useWorkspace } from '@/store/entities/workspace';
import { Header } from './components/Header';
import { Overview } from './components/Overview';
import { Provider, useWorkspacesPageContext } from './providers/Provider';

type Props = {
  loading: boolean;
};

const OVERVIEW_INDEX = 'overview' as const;
const MESSAGES_INDEX = 'messages' as const;
const CALENDAR_INDEX = 'calendar' as const;

type Index =
  | typeof OVERVIEW_INDEX
  | typeof MESSAGES_INDEX
  | typeof CALENDAR_INDEX;

export const Component = memo(function Component(props: Props) {
  return (
    <Provider loading={props.loading}>
      <WrappedComponent />
    </Provider>
  );
});

const mapURLtoTabIndex = ({ pathname }: { pathname: string | null }): Index => {
  if (isWorkspacesOverviewURL(pathname)) return OVERVIEW_INDEX;
  if (isWorkspacesMessageURL(pathname)) return MESSAGES_INDEX;
  if (isWorkspacesCalendarURL(pathname)) return CALENDAR_INDEX;

  return OVERVIEW_INDEX;
};

const WrappedComponent = memo(function WrappedComponent() {
  const { navigateToWorkspaceOverview } = useRouter();
  const { loadingQuery, setLoadingTabContent } = useWorkspacesPageContext();
  const pathname = usePathname();
  const [tabIndex, setTabIndex] = useState<Index>(
    mapURLtoTabIndex({ pathname }),
  );
  const { workspace } = useWorkspace();

  const setLoading = useCallback(() => {
    setLoadingTabContent(true);
    setTimeout(() => {
      setLoadingTabContent(false);
    }, 200);
  }, [setLoadingTabContent]);

  const navigateToOverview = useCallback(() => {
    navigateToWorkspaceOverview(workspace.id);
  }, [navigateToWorkspaceOverview, workspace.id]);

  const handleTabsChange = useCallback(
    async (index: string) => {
      switch (index as Index) {
        case OVERVIEW_INDEX: {
          setLoading();
          setTabIndex(OVERVIEW_INDEX);
          navigateToOverview();
          break;
        }
        case MESSAGES_INDEX: {
          setLoading();
          setTabIndex(MESSAGES_INDEX);
          break;
        }
        case CALENDAR_INDEX: {
          setLoading();
          setTabIndex(CALENDAR_INDEX);
          break;
        }
      }
    },
    [navigateToOverview, setLoading],
  );

  return (
    <Tabs
      value={tabIndex}
      onValueChange={(e) => handleTabsChange(e.value)}
      flex={1}
      display="flex"
    >
      <Flex
        data-testid="Workspaces"
        flex={1}
        flexDirection="column"
        maxW="full"
      >
        <Head title="Workspaces" />
        <MainHeader>
          <Header loading={loadingQuery} />
        </MainHeader>
        <Flex flex={1}>
          <Flex flex={1}>
            <TabPanel value="overview">
              <Overview />
            </TabPanel>
            <TabPanel value="messages" />
            <TabPanel value="calendar" />
          </Flex>
        </Flex>
      </Flex>
    </Tabs>
  );
});
