import { Flex, type FlexProps } from '@/components/ui/Flex';
import { Text } from '@/components/ui/Text';
import { isContentEmpty } from '@/shared/prosemirror/utils';
import { memo, useMemo } from 'react';
import { useEditorViewContext } from './EdiorProvider';

type Props = FlexProps;
export const EditorPlaceholder = memo(function EditorPlaceholder(props: Props) {
  const { children, ...rest } = props;
  const view = useEditorViewContext();

  const show = useMemo(() => {
    if (!view) return true;

    return isContentEmpty(view);
  }, [view]);

  if (!show) return null;

  return (
    <Flex
      position="absolute"
      top={0}
      left={0}
      w="full"
      h="full"
      pointerEvents="none"
      alignItems="center"
      {...rest}
    >
      <Text fontSize="sm" color="text.muted">
        {children}
      </Text>
    </Flex>
  );
});
