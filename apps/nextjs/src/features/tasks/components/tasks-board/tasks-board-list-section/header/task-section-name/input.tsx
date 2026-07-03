import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { Input as AtomsInput, type InputProps } from '@/components/ui/input';
import { useClickOutside } from '@/hooks/use-click-outside';

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
  }, [value, onChange, onClickOutside]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const { ref } = useClickOutside(handleClickOutside);

  return (
    <AtomsInput
      ref={ref}
      autoFocus
      fontSize="md"
      placeholder="New section"
      unstyled
      fontWeight="semibold"
      border="1px"
      borderColor="border"
      borderStyle="solid"
      borderRadius="md"
      px={2}
      maxW={80}
      bg="white"
      {...rest}
      onChange={handleChange}
      onBlur={() => {
        if (ref.current) {
          ref.current.focus();
        }
      }}
      value={value}
    />
  );
});
