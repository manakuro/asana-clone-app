import { Box } from '@/components/ui/Box';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { memo } from 'react';

export const AddToProject = memo(function AddToProject() {
  return (
    <Button as={Box} variant="ghost" size="xs" cursor="pointer">
      <Icon icon="plus" color="text.muted" />
    </Button>
  );
});
