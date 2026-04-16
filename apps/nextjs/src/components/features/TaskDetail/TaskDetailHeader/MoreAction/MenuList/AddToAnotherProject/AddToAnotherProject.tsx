import { memo, useCallback } from 'react';
import { useTaskDetailProjectsInput } from '@/components/features/TaskDetail/hooks';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';

type Props = {
  onMouseEnter: () => void;
  onClose: () => void;
  taskId: string;
};

export const AddToAnotherProject = memo(function AddToAnotherProject(
  props: Props,
) {
  const { onMouseEnter, onClose } = props;
  const inputDisclosure = useTaskDetailProjectsInput();

  const handleClick = useCallback(async () => {
    onClose();
    inputDisclosure.onOpen();
  }, [inputDisclosure, onClose]);

  return (
    <Menu.Item onMouseEnter={onMouseEnter} onClick={handleClick} value="">
      <Icon icon="bookAdd" color="text.muted" />
      Add to another project
      <Menu.ItemCommand>Tab+P</Menu.ItemCommand>
    </Menu.Item>
  );
});
