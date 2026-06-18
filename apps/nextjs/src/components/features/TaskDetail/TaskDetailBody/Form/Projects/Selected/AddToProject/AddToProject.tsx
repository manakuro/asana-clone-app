import { memo } from 'react';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

export const AddToProject = memo(function AddToProject() {
  return (
    <Button as={Box} variant="ghost" size="xs" cursor="pointer">
      <Icon icon="plus" color="fg.muted" />
    </Button>
  );
});
