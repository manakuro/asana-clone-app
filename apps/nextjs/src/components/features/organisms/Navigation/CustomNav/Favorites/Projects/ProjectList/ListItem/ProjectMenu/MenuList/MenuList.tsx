import { Portal } from '@/components/ui/atoms';
import {
  MenuList as AtomsMenuList,
  MenuItem,
} from '@/components/ui/organisms/Menu';
import { useClickOutside } from '@/hooks';
import { RemoveFromFavorites } from './RemoveFromFavorites';

type Props = {
  projectId: string;
  onClose: () => void;
};

export function MenuList(props: Props) {
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
}
