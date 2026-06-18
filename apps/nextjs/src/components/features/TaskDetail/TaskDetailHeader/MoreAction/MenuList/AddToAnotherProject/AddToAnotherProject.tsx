import { memo, useCallback } from 'react';
import { useTaskDetailProjectsInput } from '@/components/features/TaskDetail/hooks';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';

export const AddToAnotherProject = memo(function AddToAnotherProject() {
  const inputDisclosure = useTaskDetailProjectsInput();

  const handleClick = useCallback(async () => {
    inputDisclosure.onOpen();
  }, [inputDisclosure]);

  return (
    <Menu.Item onSelect={handleClick} value="Add to another project">
      <Icon icon="bookAdd" color="fg.muted" />
      Add to another project
      <Menu.ItemCommand>Tab+P</Menu.ItemCommand>
    </Menu.Item>
  );
});
