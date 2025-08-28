import {
  TaskDetailBody,
  TaskDetailFooter,
  TaskDetailHeader,
} from '@/components/features/organisms/TaskDetail';
import { Flex } from '@/components/ui/atoms';
import { memo } from 'react';

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
      borderColor="gray.200"
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
            borderColor="gray.200"
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
