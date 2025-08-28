import { ColorBox, Icon, WrapItem } from '@/components/ui/atoms';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';
import { memo, useCallback } from 'react';

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
