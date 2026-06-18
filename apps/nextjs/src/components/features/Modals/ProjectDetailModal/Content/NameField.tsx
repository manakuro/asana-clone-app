import type React from 'react';
import { memo, useCallback, useEffect, useState } from 'react';
import { Input, type InputProps } from '@/components/ui/input';
import { useDebounce } from '@/hooks';

type Props = {
  value: string;
  onChange: (val: string) => void;
} & Omit<InputProps, 'onChange'>;

export const NameField = memo(function NameField(props: Props) {
  const [value, setValue] = useState<string>(props.value);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useDebounce(value, props.onChange, 500);

  return (
    <Input
      onClick={(e) => e.stopPropagation()}
      onChange={handleChange}
      value={value}
      autoFocus
    />
  );
});
