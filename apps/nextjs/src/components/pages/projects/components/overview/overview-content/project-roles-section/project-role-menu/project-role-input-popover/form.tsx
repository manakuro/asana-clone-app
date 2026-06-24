import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { Input as AtomsInput } from '@/components/ui/input';

type Props = {
  defaultValue: string;
  initialFocusRef: React.Ref<HTMLInputElement | null>;
  onChange: (value: string) => void;
};

export const Form = memo(function Form(props: Props) {
  const { initialFocusRef, defaultValue, onChange } = props;
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleDone = useCallback(() => {
    onChange(value);
  }, [onChange, value]);

  return (
    <Flex alignItems="center" mt={2}>
      <AtomsInput
        value={value}
        onChange={handleChange}
        ref={initialFocusRef}
        placeholder="e.g. Approver, Contributor, Tester"
        size="sm"
        autoFocus
      />
      <Button ml={2} colorPalette="teal" size="sm" onClick={handleDone}>
        Done
      </Button>
    </Flex>
  );
});
