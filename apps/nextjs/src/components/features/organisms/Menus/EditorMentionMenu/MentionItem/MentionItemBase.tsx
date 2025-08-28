import {
  type SetValueParam,
  useEditorMentionMenu,
} from '@/components/features/organisms/Menus/EditorMentionMenu';
import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useMenuStyle } from '@/hooks';
import { useHover } from '@/hooks/useHover';
import type { Mention } from '@/store/entities/mention';
import { memo, useCallback, useEffect, useMemo } from 'react';

type Props = Override<
  FlexProps,
  {
    onClick: (val: SetValueParam) => void;
  }
> & {
  mention: Mention;
  index: number;
};

export const MentionItemBase = memo(function MentionItemBase(props: Props) {
  const { onClick, ...rest } = props;
  const styles = useMenuStyle().item;
  const { ref, isHovering } = useHover();
  const { selectedIndex, setSelectedIndex } = useEditorMentionMenu();

  styles._hover = undefined;

  const handleClick = useCallback(() => {
    onClick({ id: props.mention.id, type: props.mention.type });
  }, [onClick, props.mention]);

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
      onClick={handleClick}
      {...rest}
    >
      {props.children}
    </Flex>
  );
});
