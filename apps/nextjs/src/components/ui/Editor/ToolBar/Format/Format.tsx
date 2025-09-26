import { useEditorStateContext } from '@/components/ui/Editor/Editors';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Link } from '@/components/ui/Link';
import { Popover, PopoverTrigger } from '@/components/ui/Popover';
import { PortalManager } from '@/components/ui/PortalManager';
import { useDisclosure } from '@/shared/chakra';
import {
  useBold,
  useBulletList,
  useItalic,
  useOrderedList,
  useStrikethrough,
  useUnderline,
} from '@/shared/prosemirror/hooks';
import { memo, useCallback, useMemo } from 'react';
import { Content } from './Content';

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
    <PortalManager zIndex={1500}>
      <Popover
        isOpen={popoverDisclosure.isOpen}
        placement="top"
        isLazy
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Link onClick={popoverDisclosure.onOpen}>
            <IconButton
              aria-label="format"
              icon={<Icon icon="textFormat" color="text.muted" />}
              variant="ghost"
              size="sm"
              colorScheme="teal"
              isActive={isActive}
            />
          </Link>
        </PopoverTrigger>
        {popoverDisclosure.isOpen && <Content onClose={handleClose} />}
      </Popover>
    </PortalManager>
  );
});
