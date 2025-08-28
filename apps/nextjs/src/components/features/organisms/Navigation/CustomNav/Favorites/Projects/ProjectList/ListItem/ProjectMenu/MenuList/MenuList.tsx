import { Portal } from '@/components/ui/atoms';
import {
  MenuList as AtomsMenuList,
  MenuItem,
} from '@/components/ui/organisms/Menu';
import { useClickOutside } from '@/hooks';
import type React from 'react';
import { RemoveFromFavorites } from './RemoveFromFavorites';

type Props = {
  projectId: string;
  onClose: () => void;
};

export const MenuList: React.FC<Props> = (props) => {
  const { onClose, projectId } = props;
  const { ref } = useClickOutside<HTMLDivElement>(() => {
    onClose();
  });

  return (
    <Portal>
      <AtomsMenuList ref={ref}>
        <RemoveFromFavorites onClose={onClose} projectId={projectId} />
        <MenuItem isDisabled>Duplicate Project...</MenuItem>
      </AtomsMenuList>
    </Portal>
  );
};
