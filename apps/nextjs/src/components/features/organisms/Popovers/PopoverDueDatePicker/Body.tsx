import { Button, Divider, Flex, type FlexProps } from '@/components/ui/atoms';
import { DatePicker } from '@/components/ui/organisms/DatePicker';
import {
  PopoverBody,
  type PopoverProps,
} from '@/components/ui/organisms/Popover';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useDisclosure } from '@/shared/chakra';
import { dateFns } from '@/shared/dateFns';
import React, { memo, useCallback, useEffect } from 'react';
import { DueTime } from './DueTime';

type Props = {
  date: string;
  onChange: (date: Date) => void;
  onClear: () => void;
  onCloseMenu: () => void;
  time?: string;
  includeDueTime?: boolean;
} & PopoverProps;

const MIN_DATE = dateFns.addYears(new Date(), -1);
const MAX_DATE = dateFns.addYears(new Date(), 1);

export const Body = memo(function Body(props: Props) {
  const { onChange, onClear } = props;
  const includeDueTime = props.includeDueTime ?? false;
  const [value, setValue] = React.useState<Date | null>(new Date(props.date));
  const dueTimeDisclosure = useDisclosure();
  const { ref } = useClickOutside<HTMLDivElement>(props.onCloseMenu);

  useEffect(() => {
    setValue(new Date(props.date));
  }, [props.date]);

  const handleAccept = useCallback(
    (newValue: unknown) => {
      onChange(newValue as Date);
    },
    [onChange],
  );
  const optionContainerStyle: FlexProps = dueTimeDisclosure.isOpen
    ? { flexDirection: 'column' }
    : { flexDirection: 'row' };

  const handleDueTimeClick = useCallback(() => {
    dueTimeDisclosure.onToggle();
  }, [dueTimeDisclosure]);

  return (
    <PopoverBody p={4} ref={ref} onClick={(e) => e.stopPropagation()}>
      <DatePicker
        value={value}
        onChange={(newValue) => {
          setValue(newValue as Date);
        }}
        onAccept={handleAccept}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
      />
      {
        <>
          <Divider />
          <Flex mt={2} {...optionContainerStyle} cursor="auto">
            {includeDueTime && (
              <DueTime
                onClick={handleDueTimeClick}
                isEditing={dueTimeDisclosure.isOpen}
                time={props.time}
              />
            )}
            <Button
              variant="ghost"
              size="sm"
              ml="auto"
              mt={dueTimeDisclosure.isOpen ? 3 : 0}
              onClick={onClear}
            >
              Clear
            </Button>
          </Flex>
        </>
      }
    </PopoverBody>
  );
});
