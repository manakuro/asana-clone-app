import { useEditorEmojiMenu } from '@/components/features/organisms/Menus/EditorEmojiMenu';
import { Flex, type FlexProps, Text } from '@/components/ui/atoms';
import { useMenuStyle } from '@/hooks';
import { useHover } from '@/hooks/useHover';
import type { BaseEmoji } from '@/shared/emoji';
import { memo, useCallback, useEffect, useMemo } from 'react';

type Props = Override<
  FlexProps,
  {
    onClick: (val: BaseEmoji) => void;
  }
> & {
  emoji: BaseEmoji;
  index: number;
};

export const EmojiItem = memo(function EmojiItem(props: Props) {
  const { onClick, ...rest } = props;
  const styles = useMenuStyle().item;
  const { ref, isHovering } = useHover();
  const { selectedIndex, setSelectedIndex } = useEditorEmojiMenu();

  styles._hover = undefined;

  const handleClick = useCallback(() => {
    onClick(props.emoji);
  }, [onClick, props.emoji]);

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
      alignItems="center"
      onClick={handleClick}
      {...rest}
    >
      <Text fontSize="sm">{props.emoji.native}</Text>
      <Text ml={2} fontSize="sm" color="text.muted">
        {props.emoji.colons}
      </Text>
    </Flex>
  );
});
