import { Flex } from '@/components/ui/Flex';
import type { FileUploaderParams } from '@/components/ui/Form/FileUploader';
import { Menu } from '@/components/ui/Menu';
import { Tooltip, type TooltipProps } from '@/components/ui/Tooltip';
import { useDisclosure } from '@/shared/chakra';
import { type PropsWithChildren, memo } from 'react';
import { MenuList } from './MenuList';

type Props = PropsWithChildren<{
  label: string;
  tooltip?: Omit<TooltipProps, 'children'>;
  onUpload?: (files: FileUploaderParams) => void;
}>;

export const AttachmentMenu = memo(function AttachmentMenu(props: Props) {
  const menuDisclosure = useDisclosure();

  return (
    <Menu isLazy isOpen={menuDisclosure.isOpen} autoSelect={false}>
      <Tooltip
        hasArrow
        label={props.label}
        aria-label="Attachment button"
        {...props.tooltip}
        withIcon
      >
        <Flex onClick={menuDisclosure.onOpen}>{props.children}</Flex>
      </Tooltip>
      {menuDisclosure.isOpen && (
        <MenuList onUpload={props.onUpload} onClose={menuDisclosure.onClose} />
      )}
    </Menu>
  );
});
