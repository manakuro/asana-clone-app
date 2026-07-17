import { memo, useCallback, useEffect, useMemo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Text } from '@/components/ui/text';
import { useEditorEmojiMenu } from '@/features/editor/components/editor-emoji-menu';
import { useMenuStyle } from '@/hooks/styles/use-menu-style';
import { useHover } from '@/hooks/use-hover';
import { type BaseEmoji, getNative, getShortcodes } from '@/lib/emoji';

type Props = {
  onClick: (val: BaseEmoji) => void;
  emoji: BaseEmoji;
  index: number;
};

export const EmojiItem = memo(function EmojiItem(props: Props) {
  const { onClick } = props;
  const styles = useMenuStyle().item;
  const { ref, isHovering } = useHover<HTMLDivElement>();
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
      css={styles}
      bg={selected ? styles._focus?.bg : 'transparent'}
      fontSize="sm"
      alignItems="center"
      onClick={handleClick}
    >
      <Text fontSize="sm">{getNative(props.emoji)}</Text>
      <Text ml={2} fontSize="sm" color="fg.muted">
        {getShortcodes(props.emoji)}
      </Text>
    </Flex>
  );
});
