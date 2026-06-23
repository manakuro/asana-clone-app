import { memo, useMemo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';

type Props = FlexProps;

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fir', 'Sat'];
export const TasksCalendarListHeader = memo(function TasksCalendarListHeader(
  props: Props,
) {
  const weekdays = useMemo(() => {
    return WEEKDAYS;
  }, []);

  return (
    <Flex
      flexShrink={0}
      fontSize="xs"
      color="fg.muted"
      fontWeight="medium"
      h={6}
      borderBottom={1}
      borderStyle="solid"
      borderColor="border"
      bg="white"
      {...props}
    >
      {weekdays.map((w) => (
        <Flex
          key={w}
          justifyContent="flex-start"
          h="full"
          pl={2}
          w="full"
          alignItems="center"
        >
          {w}
        </Flex>
      ))}
    </Flex>
  );
});
