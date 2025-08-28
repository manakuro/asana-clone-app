import {
  Icon as AtomsIcon,
  type BoxProps,
  Center,
  WrapItem,
} from '@/components/ui/atoms';
import { useLinkHoverStyle } from '@/hooks';
import type { IconType } from '@/shared/icons';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';
import { useProjectIcon } from '@/store/entities/projectIcon';
import { useProjectLightColor } from '@/store/entities/projectLightColor';
import type React from 'react';
import { memo, useCallback } from 'react';

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
