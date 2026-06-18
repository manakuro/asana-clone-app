import { memo, useCallback, useEffect, useMemo } from 'react';
import { useEditorEmojiMenu } from '@/components/features/Menus/EditorEmojiMenu';
import { Flex } from '@/components/ui/flex';
import { Text } from '@/components/ui/text';
import { useMenuStyle } from '@/hooks';
import { useHover } from '@/hooks/useHover';
import type { BaseEmoji } from '@/shared/emoji';

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
      <Text fontSize="sm">{props.emoji.native}</Text>
      <Text ml={2} fontSize="sm" color="fg.muted">
        {props.emoji.colons}
      </Text>
    </Flex>
  );
});
