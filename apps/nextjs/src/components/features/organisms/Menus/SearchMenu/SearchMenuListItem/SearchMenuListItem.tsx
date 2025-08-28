import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useMenuStyle } from '@/hooks';
import { useHover } from '@/hooks/useHover';
import { memo, useEffect, useMemo } from 'react';
import { useSearchMenuIndex } from '../useSearchMenuIndex';

type Props = FlexProps & {
  index: number;
};

export const SearchMenuListItem = memo(function SearchMenuListItem(
  props: Props,
) {
  const styles = useMenuStyle().item;
  const { ref, isHovering } = useHover();
  const { selectedIndex, setSelectedIndex } = useSearchMenuIndex();

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
      {...styles}
      bg={selected ? styles._focus.bg : 'transparent'}
      fontSize="sm"
      {...props}
    />
  );
});
