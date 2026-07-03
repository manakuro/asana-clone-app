import { memo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useCustomizeMenu } from '@/features/tasks/components/tasks-header/customize-menu/use-customize-menu';

export const CustomizeButton = memo(function CustomizeButton() {
  const { setIsOpen } = useCustomizeMenu();

  const handleClick = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <Button
      variant="ghost"
      aria-label="Sort tasks"
      size="xs"
      onClick={handleClick}
    >
      <Icon icon="customize" />
      Customize
    </Button>
  );
});
