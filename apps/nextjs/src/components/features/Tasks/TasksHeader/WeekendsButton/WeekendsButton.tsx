import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

export const WeekendsButton = memo(function WeekendsButton() {
  return (
    <Button variant="ghost" size="xs">
      <Icon icon="calendarAlt" color="fg.muted" />
      Weekends: On
    </Button>
  );
});
