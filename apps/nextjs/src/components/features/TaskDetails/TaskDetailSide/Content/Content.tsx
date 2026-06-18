import { memo } from 'react';
import {
  TaskDetailBody,
  TaskDetailFooter,
  TaskDetailHeader,
} from '@/components/features/TaskDetail';
import { Flex } from '@/components/ui/flex';

const HEADER_HEIGHT = 72;
const TOP = HEADER_HEIGHT;

type Props = {
  loading: boolean;
};

export const Content = memo(function Content(props: Props) {
  return (
    <Flex
      flex={1}
      borderLeft="1px"
      borderColor="border"
      borderStyle="solid"
      boxShadow="none"
      w="full"
      maxH={`calc(100vh - ${TOP}px)`}
      h={`calc(100vh - ${TOP}px)`}
      bg="white"
      flexDirection="column"
    >
      <Flex flex={1} maxH="inherit" h="inherit" flexDirection="column">
        <Flex p={0}>
          <TaskDetailHeader
            loading={props.loading}
            borderBottom="1px"
            borderStyle="solid"
            borderColor="border"
          />
        </Flex>
        <Flex
          flex={1}
          overflow="auto"
          display="flex"
          flexDirection="column"
          p={0}
        >
          <TaskDetailBody isMakePublic loading={props.loading} />
        </Flex>
        <Flex p={0}>
          <TaskDetailFooter loading={props.loading} />
        </Flex>
      </Flex>
    </Flex>
  );
});
