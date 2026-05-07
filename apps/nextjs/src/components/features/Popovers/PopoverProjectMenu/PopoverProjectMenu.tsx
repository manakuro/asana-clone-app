import type { PropsWithChildren } from 'react';
import type { IconButtonProps } from '@/components/ui/IconButton';
import { Menu } from '@/components/ui/Menu';
import type { SystemStyleObject } from '@/shared/chakra';
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

  return (
    <Menu.Root
      lazyMount
      onOpenChange={(e) => {
        if (e.open) {
          onOpened?.();
        } else {
          onClosed?.();
        }
      }}
    >
      <Menu.Trigger {...iconButton} {...menuButtonStyle}>
        {props.children}
      </Menu.Trigger>
      <MenuList
        project={project}
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
        duplicateProject={duplicateProject}
        archiveProject={archiveProject}
        deleteProject={deleteProject}
        editProjectDetails={editProjectDetails}
        copyProjectLink={copyProjectLink}
        share={share}
      />
    </Menu.Root>
  );
}
