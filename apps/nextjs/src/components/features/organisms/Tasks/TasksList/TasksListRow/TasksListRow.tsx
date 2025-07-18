import type React from 'react';
import { memo, useMemo } from 'react';
import { Flex, type FlexProps } from 'src/components/ui/atoms';
import { useClickableHoverStyle } from 'src/hooks';

type Props = FlexProps & {
  selected?: boolean;
};

export const TasksListRow: React.FC<Props> = memo<Props>((props) => {
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
TasksListRow.displayName = 'TasksListRow';
