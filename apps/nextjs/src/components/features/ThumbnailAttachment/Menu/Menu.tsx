import { useThumbnailAttachmentContext } from '@/components/features/ThumbnailAttachment/Provider';
import { Link } from '@/components/ui/Link';
import {
  MenuItem,
  MenuList,
  type MenuProps,
  Menu as OrganismsMenu,
} from '@/components/ui/Menu';
import { Portal } from '@/components/ui/Portal';
import { useTaskFile } from '@/store/entities/taskFile';
import { memo, useCallback } from 'react';

type Props = MenuProps & {
  taskFileId: string;
};

export const Menu = memo(function Menu(props: Props) {
  const { taskFileId, ...rest } = props;
  const { setThumbnailMenuOpened, onDelete } = useThumbnailAttachmentContext();
  const { taskFile } = useTaskFile(taskFileId);

  const handleThumbnailMenuOpen = useCallback(() => {
    setThumbnailMenuOpened(true);
  }, [setThumbnailMenuOpened]);

  const handleThumbnailMenuClose = useCallback(() => {
    setThumbnailMenuOpened(false);
  }, [setThumbnailMenuOpened]);

  return (
    <OrganismsMenu
      onOpen={handleThumbnailMenuOpen}
      onClose={handleThumbnailMenuClose}
      {...rest}
    >
      {props.children}
      <Portal>
        <MenuList>
          <MenuItem>
            <Link href={taskFile.src} download>
              Download taskFile
            </Link>
          </MenuItem>
          <MenuItem onClick={onDelete} color="alert" isDisabled>
            Delete task file
          </MenuItem>
        </MenuList>
      </Portal>
    </OrganismsMenu>
  );
});
