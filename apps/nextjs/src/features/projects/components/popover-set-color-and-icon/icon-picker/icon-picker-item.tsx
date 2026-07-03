import type React from 'react';
import { memo, useCallback } from 'react';
import type { BoxProps } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Icon as AtomsIcon } from '@/components/ui/icon';
import { WrapItem } from '@/components/ui/wrap';
import { useLinkHoverStyle } from '@/hooks/styles/use-link-hover-style';
import type { IconType } from '@/shared/icons';
import { useProjectBaseColor } from '@/store/entities/project-base-color';
import { useProjectIcon } from '@/store/entities/project-icon';
import { useProjectLightColor } from '@/store/entities/project-light-color';

type Props = {
  projectIconId: string;
  currentProjectIconId: string;
  currentProjectLightColorId: string;
  currentProjectBaseColorId: string;
  onClick: (id: string) => Promise<void>;
};

export const IconPickerItem = memo(function IconPickerItem(props: Props) {
  const {
    projectIconId,
    currentProjectBaseColorId,
    currentProjectLightColorId,
    currentProjectIconId,
    onClick,
  } = props;
  const { projectIcon } = useProjectIcon(projectIconId);

  const { projectLightColor } = useProjectLightColor(
    currentProjectLightColorId,
  );
  const { projectBaseColor } = useProjectBaseColor(currentProjectBaseColorId);
  const { _hover, transition } = useLinkHoverStyle({
    color: projectLightColor.color.color,
  });

  const handlePickIcon = useCallback(
    async (id: string) => {
      await onClick(id);
    },
    [onClick],
  );

  return (
    <WrapItem>
      <IconBox
        bg={
          currentProjectIconId === projectIcon.id
            ? projectBaseColor.color.color
            : 'transparent'
        }
        _hover={_hover}
        transition={transition}
        onClick={() => handlePickIcon(projectIcon.id)}
      >
        <AtomsIcon icon={projectIcon.icon.icon as IconType} w={6} h={6} />
      </IconBox>
    </WrapItem>
  );
});

const IconBox: React.FC<BoxProps> = (props) => (
  <Center borderRadius="sm" w="44px" h="44px" cursor="pointer" {...props} />
);
