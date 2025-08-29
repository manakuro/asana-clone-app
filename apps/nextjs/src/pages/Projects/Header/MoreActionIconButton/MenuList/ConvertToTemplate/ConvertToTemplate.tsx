import { Icon } from '@/components/ui/atoms';
import { MenuItem } from '@/components/ui/organisms/Menu';
import { memo } from 'react';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const ConvertToTemplate = memo(function ConvertToTemplate(props: Props) {
  const { onMouseEnter } = props;

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="layout" color="text.muted" />}
      isDisabled
    >
      Convert to template
    </MenuItem>
  );
});
