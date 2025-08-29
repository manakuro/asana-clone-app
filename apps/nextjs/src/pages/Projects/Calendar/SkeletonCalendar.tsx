import {
  TasksCalendarContent,
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
} from '@/components/features/organisms/Tasks';
import { Flex, type FlexProps, Skeleton, Stack } from '@/components/ui/atoms';
import { memo } from 'react';

type Props = FlexProps;

const BUTTON_HEIGHT = '28px';
export const SkeletonCalendar = memo(function SkeletonCalendar(props: Props) {
  return (
    <Flex flex={1} flexDirection="column" {...props}>
      <TasksHeader
        h="40px"
        boxShadow="sm"
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.200"
        alignItems="center"
      >
        <TasksHeaderLeft>
          <Skeleton h={BUTTON_HEIGHT} w="127px" />
        </TasksHeaderLeft>
        <TasksHeaderRight ml="auto">
          <Skeleton h={BUTTON_HEIGHT} w="57px" />
          <Skeleton h={BUTTON_HEIGHT} w="91px" />
        </TasksHeaderRight>
      </TasksHeader>
      <Flex flex={1} flexDirection="column">
        <Flex
          flexShrink={0}
          fontSize="xs"
          color="text.muted"
          fontWeight="medium"
          h={6}
          borderBottom={1}
          borderStyle="solid"
          borderColor="gray.200"
          bg="white"
        />
        <TasksCalendarContent bg="gray.50">
          <Stack spacing={4} direction="row" p={2}>
            {[...new Array(3)]
              .map((_, i) => i + 1)
              .map((v) => (
                <Skeleton h="185px" w="120px" key={v} />
              ))}
          </Stack>
        </TasksCalendarContent>
      </Flex>
    </Flex>
  );
});
