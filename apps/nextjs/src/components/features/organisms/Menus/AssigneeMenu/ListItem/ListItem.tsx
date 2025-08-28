import { useAssigneeMenu } from '@/components/features/organisms/Menus/AssigneeMenu/useAssigneeMenu';
import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useMenuStyle } from '@/hooks';
import { useHover } from '@/hooks/useHover';
import { memo, useEffect, useMemo } from 'react';

type Props = FlexProps & {
  index: number;
};

export const ListItem = memo(function ListItem(props: Props) {
  const styles = useMenuStyle().item;
  const { ref, isHovering } = useHover();
  const { selectedIndex, setSelectedIndex } = useAssigneeMenu();

  styles._hover = undefined;

  useEffect(() => {
    if (isHovering) setSelectedIndex(props.index);
  }, [isHovering, props.index, setSelectedIndex]);

  const selected = useMemo(
    () => props.index === selectedIndex,
    [props.index, selectedIndex],
  );

  return (
    <Flex
      ref={ref}
      bg={selected ? styles._focus.bg : 'transparent'}
      fontSize="sm"
      alignItems="center"
      {...styles}
      {...props}
    />
  );
});
