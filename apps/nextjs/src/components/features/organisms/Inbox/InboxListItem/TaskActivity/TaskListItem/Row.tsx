import { useTaskDetail } from '@/components/features/organisms/TaskDetail';
import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useClickableHoverStyle } from '@/hooks';
import { memo, useMemo } from 'react';

type Props = FlexProps & {
  taskId: string;
  isFirst?: boolean;
  isLast?: boolean;
};

export const Row = memo(function Row(props: Props) {
  const { isFirst, isLast, taskId, ...rest } = props;
  const { taskId: taskDetailTaskId } = useTaskDetail();
  const selected = useMemo(
    () => taskDetailTaskId === taskId,
    [taskDetailTaskId, taskId],
  );
  const containerStyle = useMemo(
    (): FlexProps => ({
      ...(isFirst ? { borderTopRadius: 'sm' } : {}),
      ...(isLast ? { borderBottomRadius: 'sm' } : {}),
      ...(selected
        ? { bg: 'teal.50', _hover: { bg: 'teal.50' } }
        : { bg: 'white' }),
    }),
    [isFirst, isLast, selected],
  );
  const { clickableHoverStyle } = useClickableHoverStyle();

  return (
    <Flex
      maxW="90%"
      flex={1}
      h="36px"
      minH="36px"
      marginBottom="-1px"
      alignItems="center"
      px={2}
      border="1px"
      borderStyle="solid"
      borderColor="gray.200"
      position="relative"
      justifyContent="flex-end"
      {...clickableHoverStyle}
      {...containerStyle}
      {...rest}
    />
  );
});
