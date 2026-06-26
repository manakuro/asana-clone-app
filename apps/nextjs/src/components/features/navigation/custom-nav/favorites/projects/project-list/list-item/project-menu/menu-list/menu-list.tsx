import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import { useClickOutside } from '@/hooks/use-click-outside';
import { RemoveFromFavorites } from './remove-from-favorites';

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
      <Menu.Positioner>
        <Menu.Content ref={ref}>
          <RemoveFromFavorites onClose={onClose} projectId={projectId} />
          <Menu.Item disabled value="1">
            Duplicate Project...
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
}
