import { Input as AtomsInput, type InputProps } from '@/components/ui/atoms';
import { useClickOutside } from '@/hooks';
import type React from 'react';
import { memo, useCallback, useState } from 'react';

type Props = {
  onClickOutside: () => void;
  onChange: (val: string) => void;
  value: string;
} & Omit<InputProps, 'onChange'>;

export const Input = memo(function Input(props: Props) {
  const { onClickOutside, onChange, ...rest } = props;
  const [value, setValue] = useState<string>(props.value);

  const handleClickOutside = useCallback(() => {
    props.onChange(value);
    props.onClickOutside();
  }, [props, value]);

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
      variant="unstyled"
      fontWeight="semibold"
      border="1px"
      borderColor="gray.300"
      px={2}
      maxW={80}
      {...rest}
      onChange={handleChange}
      value={value}
    />
  );
});
