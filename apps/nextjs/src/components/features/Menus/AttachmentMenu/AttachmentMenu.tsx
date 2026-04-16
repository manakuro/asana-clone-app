import { memo, type PropsWithChildren } from 'react';
import { Flex } from '@/components/ui/Flex';
import type { FileUploaderParams } from '@/components/ui/Form/FileUploader';
import { Menu } from '@/components/ui/Menu';
import { Tooltip, type TooltipProps } from '@/components/ui/Tooltip';
import { useDisclosure } from '@/shared/chakra';
import { MenuList } from './MenuList';

type Props = PropsWithChildren<{
  label: string;
  tooltip?: Omit<TooltipProps, 'children' | 'content'>;
  onUpload?: (files: FileUploaderParams) => void;
}>;

export const AttachmentMenu = memo(function AttachmentMenu(props: Props) {
  const menuDisclosure = useDisclosure();

  return (
    <Menu.Root lazyMount open={menuDisclosure.open}>
      <Tooltip
        showArrow
        content={props.label}
        aria-label="Attachment button"
        {...props.tooltip}
        withIcon
      >
        <Flex onClick={menuDisclosure.onOpen}>{props.children}</Flex>
      </Tooltip>
      {menuDisclosure.open && (
        <MenuList onUpload={props.onUpload} onClose={menuDisclosure.onClose} />
      )}
    </Menu.Root>
  );
});
