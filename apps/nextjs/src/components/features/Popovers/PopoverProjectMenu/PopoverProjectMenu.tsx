import type { MouseEvent, PropsWithChildren } from 'react';
import { useCallback } from 'react';
import type { IconButtonProps } from '@/components/ui/IconButton';
import { Menu } from '@/components/ui/Menu';
import { type SystemStyleObject, useDisclosure } from '@/shared/chakra';
import { useProject } from '@/store/entities/project';
import { MenuList } from './MenuList';

type Props = {
  projectId: string;
  closeMenu?: boolean;
  addFavorite?: boolean;
  removeFavorite?: boolean;
  duplicateProject?: boolean;
  archiveProject?: boolean;
  deleteProject?: boolean;
  editProjectDetails?: boolean;
  copyProjectLink?: boolean;
  share?: boolean;
  iconButton?: IconButtonProps;
  menuButtonStyle?: SystemStyleObject;
  onOpened?: () => void;
  onClosed?: () => void;
};
export type PopoverProjectMenuProps = Props;

export function PopoverProjectMenu(props: PropsWithChildren<Props>) {
  const {
    projectId,
    addFavorite,
    removeFavorite,
    duplicateProject,
    archiveProject,
    deleteProject,
    editProjectDetails,
    copyProjectLink,
    share,
    iconButton,
    menuButtonStyle,
    onOpened,
    onClosed,
  } = props;
  const { project } = useProject(projectId);
  const { onClose, onOpen, open } = useDisclosure();

  const handleCloseMenu = useCallback(() => {
    onClose();
    onClosed?.();
  }, [onClose, onClosed]);

  const handleOpen = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      onOpen();
      onOpened?.();
    },
    [onOpen, onOpened],
  );

  return (
    <Menu.Root closeOnSelect={false} open={open} lazyMount>
      <Menu.Trigger
        asChild
        onClick={handleOpen}
        {...iconButton}
        {...menuButtonStyle}
      >
        {props.children}
      </Menu.Trigger>
      {open && (
        <MenuList
          project={project}
          onCloseMenu={handleCloseMenu}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          duplicateProject={duplicateProject}
          archiveProject={archiveProject}
          deleteProject={deleteProject}
          editProjectDetails={editProjectDetails}
          copyProjectLink={copyProjectLink}
          share={share}
        />
      )}
    </Menu.Root>
  );
}
