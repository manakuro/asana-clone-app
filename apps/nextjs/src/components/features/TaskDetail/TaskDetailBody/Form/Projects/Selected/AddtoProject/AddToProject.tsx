import { memo } from 'react';
import { Button } from '@/components/ui/Button';
import { Box } from '@/components/ui/box';
import { Icon } from '@/components/ui/Icon';

export const AddToProject = memo(function AddToProject() {
  return (
    <Button as={Box} variant="ghost" size="xs" cursor="pointer">
      <Icon icon="plus" color="fg.muted" />
    </Button>
  );
});
