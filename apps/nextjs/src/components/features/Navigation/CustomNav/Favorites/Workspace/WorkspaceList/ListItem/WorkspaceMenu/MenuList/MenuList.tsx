import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
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
      <Menu.Positioner>
        <Menu.Content ref={ref}>
          <RemoveFromFavorites onClose={onClose} workspaceId={workspaceId} />
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
}
