import { Box } from '@/components/ui/atoms/Box';
import { Button } from '@/components/ui/atoms/Button';
import { Icon } from '@/components/ui/atoms/Icon';
import { memo } from 'react';

export const AddToProject = memo(function AddToProject() {
  return (
    <Button as={Box} variant="ghost" size="xs" cursor="pointer">
      <Icon icon="plus" color="text.muted" />
    </Button>
  );
});
