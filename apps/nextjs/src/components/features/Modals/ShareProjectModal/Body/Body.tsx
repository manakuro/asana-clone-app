import { memo, useCallback, useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Flex } from '@/components/ui/flex';
import { Tab, TabList, TabPanel, Tabs } from '@/components/ui/tabs';
import { type Index, MEMBERS_INDEX, SHARE_INDEX } from '../types';
import { useShareProjectModal } from '../useShareProjectModal';
import { Members } from './Members';
import { Share } from './Share';

type Props = {
  projectId: string;
};

export const Body = memo(function Body(props: Props) {
  const { projectId } = props;
  const { tabIndex, setMembersTab, setShareTab } = useShareProjectModal();
  const [loadingTabContent, setLoadingTabContent] = useState<boolean>(true);

  const setLoading = useCallback(() => {
    setLoadingTabContent(true);
    setTimeout(() => {
      setLoadingTabContent(false);
    }, 200);
  }, []);

  const handleTabsChange = useCallback(
    async (index: string) => {
      switch (index as Index) {
        case SHARE_INDEX: {
          setLoading();
          setShareTab();
          break;
        }
        case MEMBERS_INDEX: {
          setLoading();
          setMembersTab();
          break;
        }
      }
    },
    [setLoading, setMembersTab, setShareTab],
  );

  return (
    <Dialog.Body p={0}>
      <Tabs
        value={tabIndex}
        onValueChange={(e) => handleTabsChange(e.value)}
        flex={1}
        display="flex"
      >
        <Flex flex={1} flexDirection="column">
          <Flex
            borderBottom="1px"
            borderStyle="solid"
            borderColor="border"
            px={6}
          >
            <TabList>
              <Tab value="share">Share</Tab>
              <Tab value="members">Members</Tab>
            </TabList>
          </Flex>
          <Flex flex={1} py={4} minH="300px" maxH="300px" overflow="scroll">
            <Flex flex={1}>
              <TabPanel value="share">
                <Share
                  projectId={projectId}
                  loading={loadingTabContent}
                  onSetMembersTab={setMembersTab}
                />
              </TabPanel>
              <TabPanel value="members">
                <Members
                  projectId={projectId}
                  loading={loadingTabContent}
                  onSetShareTab={setShareTab}
                />
              </TabPanel>
            </Flex>
          </Flex>
        </Flex>
      </Tabs>
    </Dialog.Body>
  );
});
