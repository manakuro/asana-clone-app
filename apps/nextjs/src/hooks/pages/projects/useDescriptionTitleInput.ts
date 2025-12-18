import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from '@/hooks';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export const useDescriptionTitleInput = (props: Props) => {
  const [value, setValue] = useState<string>(props.value);

  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.code === 'Enter') e.preventDefault();
  }, []);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useDebounce(value, props.onChange, 500);

  return {
    value,
    onKeyDown,
    onChange,
  };
};
