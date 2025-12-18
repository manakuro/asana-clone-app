import { memo } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export const WeekendsButton = memo(function WeekendsButton() {
  return (
    <Button
      variant="ghost"
      leftIcon={<Icon icon="calendarAlt" color="text.muted" />}
      size="xs"
    >
      Weekends: On
    </Button>
  );
});
