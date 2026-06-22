import { memo, useCallback } from 'react';
import { ColorBox } from '@/components/ui/color-box';
import { Icon } from '@/components/ui/icon';
import { WrapItem } from '@/components/ui/wrap';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';

type Props = {
  projectBaseColorId: string;
  currentProjectBaseColorId: string;
  onClick: (id: string) => Promise<void>;
};

export const ColorPickerItem = memo(function ColorPickerItem(props: Props) {
  const { projectBaseColorId, currentProjectBaseColorId, onClick } = props;
  const { projectBaseColor } = useProjectBaseColor(projectBaseColorId);

  const handlePickColor = useCallback(
    async (id: string) => {
      await onClick(id);
    },
    [onClick],
  );

  return (
    <WrapItem>
      <ColorBox
        size="lg"
        cursor="pointer"
        color={projectBaseColor.color.color}
        onClick={() => handlePickColor(projectBaseColor.id)}
      >
        {currentProjectBaseColorId === projectBaseColor.id && (
          <Icon icon="check" color="white" />
        )}
      </ColorBox>
    </WrapItem>
  );
});
