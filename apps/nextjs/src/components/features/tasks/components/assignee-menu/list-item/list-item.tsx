import { memo, useEffect, useMemo } from 'react';
import { useAssigneeMenu } from '@/components/features/tasks/components/assignee-menu/use-assignee-menu';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useMenuStyle } from '@/hooks/styles/use-menu-style';
import { useHover } from '@/hooks/use-hover';

type Props = FlexProps & {
  index: number;
};

export const ListItem = memo(function ListItem(props: Props) {
  const styles = useMenuStyle().item;
  const { ref, isHovering } = useHover<HTMLDivElement>();
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
      bg={selected ? styles._focus?.bg : 'transparent'}
      fontSize="sm"
      alignItems="center"
      css={styles}
      {...props}
    />
  );
});
