import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { PopoverDueDatePicker } from '@/components/features/Popovers';
import { Input as AtomsInput } from '@/components/ui/input';
import { useDisclosure } from '@/shared/chakra';
import { formatDueDateInput } from '@/shared/date';

type Props = {
  onClose: () => void;
  onSelect: (val: Date) => void;
  onClear: () => void;
  dueDate: string;
};

export const Input = memo(function Input(props: Props) {
  const { onClose, onSelect, dueDate, onClear } = props;
  const popoverDisclosure = useDisclosure({ defaultOpen: true });
  const [value, setValue] = useState<string>(formatDueDateInput(dueDate));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValue(val);
      if (val) {
        popoverDisclosure.onOpen();
        return;
      }
      popoverDisclosure.onClose();
    },
    [popoverDisclosure],
  );

  const handleSelect = useCallback(
    (val: Date) => {
      setValue('');
      onSelect(val);
      onClose();
    },
    [onClose, onSelect],
  );

  const handleClear = useCallback(() => {
    setValue('');
    popoverDisclosure.onClose();
    onClear();
  }, [onClear, popoverDisclosure]);

  return (
    <PopoverDueDatePicker
      date={dueDate}
      onChange={handleSelect}
      onClear={handleClear}
      defaultOpen
      includeDueTime={false}
    >
      <AtomsInput
        autoFocus
        unstyled
        fontSize="sm"
        onChange={handleChange}
        value={value}
        ml={2}
      />
    </PopoverDueDatePicker>
  );
});
