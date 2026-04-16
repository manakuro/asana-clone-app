import { memo } from 'react';
import { PopoverSetColorAndIcon } from '@/components/features/Popovers';
import { ColorBox } from '@/components/ui/ColorBox';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';
import { Text } from '@/components/ui/Text';
import { useProject } from '@/store/entities/project';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  open: boolean;
  projectId: string;
};

export const SetColorAndIcon = memo(function SetColorAndIcon(props: Props) {
  const { onMouseEnter, open, projectId } = props;
  const { project } = useProject(projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);

  return (
    <Menu.Item value="" onMouseEnter={onMouseEnter}>
      <PopoverSetColorAndIcon
        project={project}
        open={open}
        positioning={{ placement: 'right-end' }}
      >
        <Flex>
          <ColorBox size="md" color={projectBaseColor.color.color} mt="-1px" />
          <Text fontSize="sm" flex={1}>
            Set Color & icon
          </Text>
          <Icon icon="chevronRight" />
        </Flex>
      </PopoverSetColorAndIcon>
    </Menu.Item>
  );
});
