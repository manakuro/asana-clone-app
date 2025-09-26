import { Button } from '@/components/ui/atoms/Button';
import { Icon } from '@/components/ui/atoms/Icon';
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
