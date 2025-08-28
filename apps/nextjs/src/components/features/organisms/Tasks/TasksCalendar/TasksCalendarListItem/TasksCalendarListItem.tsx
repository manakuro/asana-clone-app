import { Flex, type FlexProps, Text } from '@/components/ui/atoms';
import { memo } from 'react';
import { Content } from './Content';
import { Info } from './Info';
import { useListItemStyle } from './hooks';

type Props = {
  dateString: string;
} & FlexProps;

export const TasksCalendarListItem = memo(function TasksCalendarListItem(
  props: Props,
) {
  const { dateString, ...rest } = props;
  const { dateText, borderStyle, textStyle } = useListItemStyle({
    dateString,
  });

  return (
    <Flex
      bg="white"
      borderTop="3px"
      borderStyle="solid"
      borderTopColor="transparent"
      flexDirection="column"
      marginRight="3px"
      minH="185px"
      w="full"
      maxW="full"
      minW={0}
      p={2}
      {...borderStyle}
      {...rest}
    >
      <Flex>
        <Text
          fontSize="xs"
          fontWeight="medium"
          color="text.muted"
          {...textStyle}
        >
          {dateText}
        </Text>
        <Info dateString={dateString} />
      </Flex>
      <Content dateString={dateString} />
    </Flex>
  );
});
