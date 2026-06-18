import { memo, useCallback, useMemo } from 'react';
import { useEditorStateContext } from '@/components/ui/editor/editors';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Link } from '@/components/ui/link';
import { Popover } from '@/components/ui/popover';
import { useDisclosure } from '@/shared/chakra';
import {
  useBold,
  useBulletList,
  useItalic,
  useOrderedList,
  useStrikethrough,
  useUnderline,
} from '@/shared/prosemirror/hooks';
import { Content } from './content';

export const Format = memo(function Format() {
  const state = useEditorStateContext();
  const popoverDisclosure = useDisclosure();
  const useBoldResult = useBold();
  const useItalicResult = useItalic();
  const useUnderlineResult = useUnderline();
  const useStrikethroughResult = useStrikethrough();
  const useBulletListResult = useBulletList();
  const useOrderedListResult = useOrderedList();

  const isActive = useMemo(() => {
    return (
      useBoldResult.isActive?.(state) ||
      useItalicResult.isActive?.(state) ||
      useUnderlineResult.isActive?.(state) ||
      useStrikethroughResult.isActive?.(state) ||
      useBulletListResult.isActive?.(state) ||
      useOrderedListResult.isActive?.(state)
    );
  }, [
    state,
    useBoldResult,
    useBulletListResult,
    useItalicResult,
    useOrderedListResult,
    useStrikethroughResult,
    useUnderlineResult,
  ]);

  const handleClose = useCallback(() => {
    popoverDisclosure.onClose();
  }, [popoverDisclosure]);

  return (
    <Popover.Root
      open={popoverDisclosure.open}
      positioning={{ placement: 'top' }}
      lazyMount
      closeOnInteractOutside={false}
    >
      <Popover.Trigger asChild>
        <Link onClick={popoverDisclosure.onOpen}>
          <IconButton
            aria-label="format"
            variant="ghost"
            size="sm"
            colorPalette="teal"
            data-active={isActive}
          >
            <Icon icon="textFormat" color="fg.muted" />
          </IconButton>
        </Link>
      </Popover.Trigger>
      {popoverDisclosure.open && <Content onClose={handleClose} />}
    </Popover.Root>
  );
});
