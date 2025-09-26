import { useCustomizeMenu } from '@/components/features/Tasks/TasksHeader/CustomizeMenu/useCustomizeMenu';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
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
