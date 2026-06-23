import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { Input as AtomsInput, type InputProps } from '@/components/ui/input';
import { useClickOutside } from '@/hooks';

type Props = {
  onClickOutside: () => void;
  onChange: (val: string) => void;
  value: string;
} & Omit<InputProps, 'onChange'>;

export const Input = memo(function Input(props: Props) {
  const { onClickOutside, onChange, ...rest } = props;
  const [value, setValue] = useState<string>(props.value);

  const handleClickOutside = useCallback(() => {
    onChange(value);
    onClickOutside();
  }, [onClickOutside, onChange, value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const { ref } = useClickOutside(handleClickOutside);

  return (
    <AtomsInput
      ref={ref}
      autoFocus
      onBlur={() => {
        // Refocus the input to prevent losing focus when clicking outside,
        // as the useClickOutside hook will handle the actual blur behavior.
        if (ref.current) {
          ref.current.focus();
        }
      }}
      fontSize="md"
      placeholder="New section"
      unstyled
      fontWeight="semibold"
      border="1px"
      borderColor="border.emphasized"
      borderStyle="solid"
      borderRadius="md"
      w="full"
      px={2}
      maxW={80}
      {...rest}
      onChange={handleChange}
      value={value}
    />
  );
});
