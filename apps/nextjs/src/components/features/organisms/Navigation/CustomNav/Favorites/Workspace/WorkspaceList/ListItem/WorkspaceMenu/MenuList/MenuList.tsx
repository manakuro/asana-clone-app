import { Portal } from '@/components/ui/atoms';
import { MenuList as AtomsMenuList } from '@/components/ui/organisms/Menu';
import { useClickOutside } from '@/hooks';
import { RemoveFromFavorites } from './RemoveFromFavorites';

type Props = {
  workspaceId: string;
  onClose: () => void;
};

export function MenuList(props: Props) {
  const { onClose, workspaceId } = props;
  const { ref } = useClickOutside<HTMLDivElement>(onClose);

  return (
    <Portal>
      <AtomsMenuList ref={ref}>
        <RemoveFromFavorites onClose={onClose} workspaceId={workspaceId} />
      </AtomsMenuList>
    </Portal>
  );
}
