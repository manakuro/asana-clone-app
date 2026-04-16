import { useCallback } from 'react';
import { PopoverSetColorAndIcon } from '@/components/features/Popovers';
import { ColorBox } from '@/components/ui/ColorBox';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';
import { Portal } from '@/components/ui/Portal';
import { Text } from '@/components/ui/Text';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useDisclosure } from '@/shared/chakra';
import type { Project } from '@/store/entities/project';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';
import { ArchiveProject } from './ArchiveProject';
import { CopyProjectLink } from './CopyProjectLink';
import { DeleteProject } from './DeleteProject';
import { DuplicateProject } from './DuplicateProject';
import { EditProjectDetails } from './EditProjectDetails';
import { Favorite } from './Favorite';
import { Share } from './Share';

type Props = {
  project: Project;
  onCloseMenu: () => void;
  addFavorite?: boolean;
  removeFavorite?: boolean;
  duplicateProject?: boolean;
  archiveProject?: boolean;
  deleteProject?: boolean;
  editProjectDetails?: boolean;
  copyProjectLink?: boolean;
  share?: boolean;
};

export function MenuList(props: Props) {
  const { open, onOpen, onClose } = useDisclosure();
  const { ref } = useClickOutside<HTMLDivElement>(() => {
    onClose();
    props.onCloseMenu();
  });
  const { projectBaseColor } = useProjectBaseColor(
    props.project.projectBaseColorId,
  );

  const handleOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content color="text.base" ref={ref}>
          <Menu.Item
            onMouseEnter={handleOpen}
            onClick={(e) => e.stopPropagation()}
            value=""
          >
            <PopoverSetColorAndIcon
              project={props.project}
              open={open}
              positioning={{ placement: 'right-end' }}
            >
              <Flex>
                <ColorBox
                  size="md"
                  color={projectBaseColor.color.color}
                  mt="-1px"
                />
                <Text fontSize="sm" flex={1}>
                  Set Color & icon
                </Text>
                <Icon icon="chevronRight" />
              </Flex>
            </PopoverSetColorAndIcon>
          </Menu.Item>
          <Menu.Separator />
          {props.addFavorite && (
            <Favorite
              onClose={props.onCloseMenu}
              projectId={props.project.id}
              onMouseEnter={handleClose}
            />
          )}
          {props.editProjectDetails && (
            <EditProjectDetails
              onClose={props.onCloseMenu}
              onMouseEnter={handleClose}
              projectId={props.project.id}
            />
          )}
          {props.copyProjectLink && (
            <CopyProjectLink
              onClose={props.onCloseMenu}
              onMouseEnter={handleClose}
              projectId={props.project.id}
            />
          )}
          {props.share && (
            <Share
              onClose={props.onCloseMenu}
              onMouseEnter={handleClose}
              projectId={props.project.id}
            />
          )}
          {props.duplicateProject && (
            <DuplicateProject
              onClose={props.onCloseMenu}
              onMouseEnter={handleClose}
              projectId={props.project.id}
            />
          )}
          {props.archiveProject && (
            <ArchiveProject
              onClose={props.onCloseMenu}
              onMouseEnter={handleClose}
              projectId={props.project.id}
            />
          )}
          {props.deleteProject && (
            <DeleteProject
              onClose={props.onCloseMenu}
              onMouseEnter={handleClose}
              projectId={props.project.id}
            />
          )}
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
}
