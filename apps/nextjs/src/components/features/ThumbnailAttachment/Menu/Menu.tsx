import { memo, useCallback } from 'react';
import { useThumbnailAttachmentContext } from '@/components/features/ThumbnailAttachment/Provider';
import { Link } from '@/components/ui/link';
import {
  type MenuRootProps,
  Menu as OrganismsMenu,
} from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import { useTaskFile } from '@/store/entities/taskFile';

type Props = MenuRootProps & {
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
    <OrganismsMenu.Root
      onOpenChange={(e) => {
        if (e.open) {
          handleThumbnailMenuOpen();
        } else {
          handleThumbnailMenuClose();
        }
      }}
      {...rest}
    >
      {props.children}
      <Portal>
        <OrganismsMenu.Positioner>
          <OrganismsMenu.Content>
            <OrganismsMenu.Item value="Download taskFile">
              <Link href={taskFile.src} download>
                Download taskFile
              </Link>
            </OrganismsMenu.Item>
            <OrganismsMenu.Item
              onClick={onDelete}
              color="alert"
              disabled
              value="Delete task file"
            >
              Delete task file
            </OrganismsMenu.Item>
          </OrganismsMenu.Content>
        </OrganismsMenu.Positioner>
      </Portal>
    </OrganismsMenu.Root>
  );
});
