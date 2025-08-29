import { PopoverSetColorAndIcon } from '@/components/features/organisms/Popovers';
import { ColorBox, Flex, Icon, Text } from '@/components/ui/atoms';
import { MenuItem } from '@/components/ui/organisms/Menu';
import { useProject } from '@/store/entities/project';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';
import { memo } from 'react';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  isOpen: boolean;
  projectId: string;
};

export const SetColorAndIcon = memo(function SetColorAndIcon(props: Props) {
  const { onMouseEnter, isOpen, projectId } = props;
  const { project } = useProject(projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);

  return (
    <MenuItem
      icon={
        <ColorBox size="md" color={projectBaseColor.color.color} mt="-1px" />
      }
      onMouseEnter={onMouseEnter}
    >
      <PopoverSetColorAndIcon
        project={project}
        isOpen={isOpen}
        placement="right-end"
      >
        <Flex>
          <Text fontSize="sm" flex={1}>
            Set Color & icon
          </Text>
          <Icon icon="chevronRight" />
        </Flex>
      </PopoverSetColorAndIcon>
    </MenuItem>
  );
});
