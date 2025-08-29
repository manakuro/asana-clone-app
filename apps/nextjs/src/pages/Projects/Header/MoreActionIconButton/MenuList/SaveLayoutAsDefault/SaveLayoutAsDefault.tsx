import { Icon } from '@/components/ui/atoms';
import { MenuItem } from '@/components/ui/organisms/Menu';
import { memo } from 'react';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const SaveLayoutAsDefault = memo(function SaveLayoutAsDefault(
  props: Props,
) {
  const { onMouseEnter } = props;

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="save" color="text.muted" />}
      isDisabled
    >
      Save layout as default
    </MenuItem>
  );
});
