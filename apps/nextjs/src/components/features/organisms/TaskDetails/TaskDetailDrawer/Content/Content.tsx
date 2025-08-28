import {
  TaskDetailBody,
  TaskDetailFooter,
  TaskDetailHeader,
} from '@/components/features/organisms/TaskDetail';
import { Divider, Flex } from '@/components/ui/atoms';
import {
  type UseClickOutsideOptionsHasClickedOutside,
  useClickOutside,
  useDrawerStyle,
} from '@/hooks';
import { memo } from 'react';

const HEADER_HEIGHT = 71;
const TOP = HEADER_HEIGHT;

type Props = {
  onClose: () => void;
  loading: boolean;
  hasClickedOutside: UseClickOutsideOptionsHasClickedOutside;
};

export const Content = memo(function Content(props: Props) {
  const { hasClickedOutside } = props;
  const { drawerStyle } = useDrawerStyle();
  const { ref } = useClickOutside<HTMLDivElement>(
    () => {
      props.onClose();
    },
    {
      hasClickedOutside,
    },
  );

  return (
    <Flex
      flex={1}
      top={`${TOP}px !important`}
      left={0}
      position="absolute"
      borderTop="1px"
      borderLeft="1px"
      borderColor="gray.200"
      boxShadow="none"
      w="full"
      maxH={`calc(100vh - ${TOP}px)`}
      h={`calc(100vh - ${TOP}px)`}
      bg="white"
      flexDirection="column"
    >
      <Flex
        flex={1}
        maxH="inherit"
        h="inherit"
        ref={ref}
        flexDirection="column"
      >
        <Flex p={0}>
          <TaskDetailHeader
            onClose={props.onClose}
            loading={props.loading}
            mode="drawer"
          />
        </Flex>
        <Divider />
        <Flex {...drawerStyle.body} display="flex" flexDirection="column" p={0}>
          <TaskDetailBody isMakePublic loading={props.loading} />
        </Flex>
        <Flex p={0}>
          <TaskDetailFooter loading={props.loading} />
        </Flex>
      </Flex>
    </Flex>
  );
});
