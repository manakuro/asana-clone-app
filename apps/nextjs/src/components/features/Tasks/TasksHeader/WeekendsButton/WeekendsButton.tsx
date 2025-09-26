import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { memo } from 'react';

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
