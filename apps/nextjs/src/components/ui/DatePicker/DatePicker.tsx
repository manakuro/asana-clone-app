'use client';

import { DatePicker as ChakraDatePicker, parseDate } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';

type Props = {
  value: Date | null;
  onChange?: (date: Date | null) => void;
  onAccept?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
};

function isValidDate(date: Date): boolean {
  return !Number.isNaN(date.getTime());
}

function toDateValue(date: Date | null | undefined) {
  if (!date || !isValidDate(date)) return undefined;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return parseDate(`${year}-${month}-${day}`);
}

function toDate(dateValue: { year: number; month: number; day: number }) {
  return new Date(dateValue.year, dateValue.month - 1, dateValue.day);
}

export function DatePicker(props: Props) {
  const { value, onChange, onAccept, minDate, maxDate } = props;

  const dateValue = useMemo(() => {
    const parsed = toDateValue(value);
    return parsed ? [parsed] : [];
  }, [value]);

  const min = useMemo(() => toDateValue(minDate), [minDate]);
  const max = useMemo(() => toDateValue(maxDate), [maxDate]);

  const handleValueChange = useCallback(
    (details: {
      value: Array<{ year: number; month: number; day: number }>;
    }) => {
      const newDate = details.value[0] ? toDate(details.value[0]) : null;
      onChange?.(newDate);
      onAccept?.(newDate);
    },
    [onChange, onAccept],
  );

  return (
    <ChakraDatePicker.Root
      inline
      value={dateValue}
      onValueChange={handleValueChange}
      min={min}
      max={max}
      locale="en-US"
      colorPalette="teal"
    >
      <ChakraDatePicker.Content unstyled>
        <ChakraDatePicker.View view="day">
          <ChakraDatePicker.Header />
          <ChakraDatePicker.DayTable
            css={{
              '& [data-part="table-cell-trigger"]': {
                cursor: 'pointer',
              },
            }}
          />
        </ChakraDatePicker.View>
        <ChakraDatePicker.View view="month">
          <ChakraDatePicker.Header />
          <ChakraDatePicker.MonthTable />
        </ChakraDatePicker.View>
        <ChakraDatePicker.View view="year">
          <ChakraDatePicker.Header />
          <ChakraDatePicker.YearTable />
        </ChakraDatePicker.View>
      </ChakraDatePicker.Content>
    </ChakraDatePicker.Root>
  );
}
