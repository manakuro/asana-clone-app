import { memo } from 'react';
import { ColorBox } from '@/components/ui/color-box';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { PopoverSetColorAndIcon } from '@/features/project/components/popover-set-color-and-icon/popover-set-color-and-icon';
import { useProject } from '@/store/entities/project';
import { useProjectBaseColor } from '@/store/entities/project-base-color';

type Props = {
  projectId: string;
};

export const SetColorAndIcon = memo(function SetColorAndIcon(props: Props) {
  const { projectId } = props;
  const { project } = useProject(projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);

  return (
    <PopoverSetColorAndIcon
      project={project}
      positioning={{ placement: 'right-end' }}
    >
      <Flex alignItems="center" px="1.5" py={2} cursor="pointer">
        <ColorBox size="md" color={projectBaseColor.color.color} mt="-1px" />
        <Text fontSize="sm" flex={1} ml={2}>
          Set Color & icon
        </Text>
        <Icon icon="chevronRight" />
      </Flex>
    </PopoverSetColorAndIcon>
  );
});
