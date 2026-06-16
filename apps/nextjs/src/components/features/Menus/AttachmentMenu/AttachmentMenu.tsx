import { memo, type PropsWithChildren } from 'react';
import type { FileUploaderParams } from '@/components/ui/Form/FileUploader';
import { Menu } from '@/components/ui/Menu';
import { Tooltip, type TooltipProps } from '@/components/ui/Tooltip';
import { MenuList } from './MenuList';

type Props = PropsWithChildren<{
  label: string;
  tooltip?: Omit<TooltipProps, 'children' | 'content'>;
  onUpload?: (files: FileUploaderParams) => void;
}>;

export const AttachmentMenu = memo(function AttachmentMenu(props: Props) {
  return (
    <Menu.Root lazyMount>
      <Tooltip
        showArrow
        content={props.label}
        aria-label="Attachment button"
        {...props.tooltip}
        withIcon
      >
        {props.children}
      </Tooltip>
      <MenuList onUpload={props.onUpload} />
    </Menu.Root>
  );
});
