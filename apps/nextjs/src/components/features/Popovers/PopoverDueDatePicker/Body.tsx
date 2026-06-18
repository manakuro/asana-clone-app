import React, { memo, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Popover } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useDisclosure } from '@/shared/chakra';
import { dateFns } from '@/shared/dateFns';
import { DueTime } from './DueTime';

type Props = {
  date: string;
  onChange: (date: Date) => void;
  onClear: () => void;
  onCloseMenu: () => void;
  time?: string;
  includeDueTime?: boolean;
};

const MIN_DATE = dateFns.addYears(new Date(), -1);
const MAX_DATE = dateFns.addYears(new Date(), 1);

export const Body = memo(function Body(props: Props) {
  const { onChange, onClear } = props;
  const includeDueTime = props.includeDueTime ?? false;
  const [value, setValue] = React.useState<Date | null>(new Date(props.date));
  const dueTimeDisclosure = useDisclosure();

  useEffect(() => {
    setValue(new Date(props.date));
  }, [props.date]);

  const handleAccept = useCallback(
    (newValue: Date | null) => {
      if (newValue) {
        onChange(newValue as Date);
      }
    },
    [onChange],
  );
  const optionContainerStyle: FlexProps = dueTimeDisclosure.open
    ? { flexDirection: 'column' }
    : { flexDirection: 'row' };

  const handleDueTimeClick = useCallback(() => {
    dueTimeDisclosure.onToggle();
  }, [dueTimeDisclosure]);

  return (
    <Popover.Body p={4} onClick={(e) => e.stopPropagation()}>
      <DatePicker
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        onAccept={handleAccept}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
      />
      <Separator mt={3} />
      <Flex {...optionContainerStyle} cursor="auto">
        {includeDueTime && (
          <DueTime
            onClick={handleDueTimeClick}
            isEditing={dueTimeDisclosure.open}
            time={props.time}
          />
        )}
        <Button
          variant="ghost"
          size="sm"
          ml="auto"
          mt={dueTimeDisclosure.open ? 3 : 0}
          onClick={onClear}
        >
          Clear
        </Button>
      </Flex>
    </Popover.Body>
  );
});
