import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useClickableHoverStyle } from '@/hooks';
import { memo, useMemo } from 'react';

type Props = FlexProps & {
  selected?: boolean;
};

export const TasksListRow = memo(function TasksListRow(props: Props) {
  const { selected, ...rest } = props;
  const { clickableHoverStyle } = useClickableHoverStyle();
  const style = useMemo<FlexProps>(() => {
    return {
      ...(selected
        ? { bg: 'teal.50', _hover: { bg: 'teal.50' } }
        : { bg: 'white' }),
    };
  }, [selected]);

  return (
    <Flex
      {...clickableHoverStyle}
      cursor="auto"
      h="36px"
      {...style}
      {...rest}
    />
  );
});
