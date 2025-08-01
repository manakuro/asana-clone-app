import { useCustomizeMenu } from '@/components/features/organisms/Tasks/TasksHeader/CustomizeMenu/useCustomizeMenu';
import { Button, Icon } from '@/components/ui/atoms';
import { memo, useCallback } from 'react';

export const CustomizeButton = memo(function CustomizeButton() {
  const { setIsOpen } = useCustomizeMenu();

  const handleClick = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <Button
      variant="ghost"
      aria-label="Sort tasks"
      leftIcon={<Icon icon="customize" />}
      size="xs"
      onClick={handleClick}
    >
      Customize
    </Button>
  );
});
