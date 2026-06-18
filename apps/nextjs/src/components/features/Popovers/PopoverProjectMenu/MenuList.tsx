import { PopoverSetColorAndIcon } from '@/components/features/Popovers';
import { ColorBox } from '@/components/ui/color-box';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import { Text } from '@/components/ui/text';
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
  const { projectBaseColor } = useProjectBaseColor(
    props.project.projectBaseColorId,
  );

  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content color="fg">
          <PopoverSetColorAndIcon
            project={props.project}
            positioning={{ placement: 'right-end' }}
          >
            <Flex alignItems="center" px="1.5" py={2} cursor="pointer">
              <ColorBox
                size="md"
                color={projectBaseColor.color.color}
                mt="-1px"
              />
              <Text fontSize="sm" flex={1} ml={2}>
                Set Color & icon
              </Text>
              <Icon icon="chevronRight" />
            </Flex>
          </PopoverSetColorAndIcon>
          <Menu.Separator />
          {props.addFavorite && <Favorite projectId={props.project.id} />}
          {props.editProjectDetails && (
            <EditProjectDetails projectId={props.project.id} />
          )}
          {props.copyProjectLink && (
            <CopyProjectLink projectId={props.project.id} />
          )}
          {props.share && <Share projectId={props.project.id} />}
          {props.duplicateProject && (
            <DuplicateProject projectId={props.project.id} />
          )}
          {props.archiveProject && (
            <ArchiveProject projectId={props.project.id} />
          )}
          {props.deleteProject && (
            <DeleteProject projectId={props.project.id} />
          )}
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
}
