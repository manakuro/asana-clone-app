import { memo, useMemo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Text } from '@/components/ui/text';
import { isContentEmpty } from '@/shared/prosemirror/utils';
import { useEditorViewContext } from './editor-provider';

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
      <Text fontSize="sm" color="fg.muted">
        {children}
      </Text>
    </Flex>
  );
});
