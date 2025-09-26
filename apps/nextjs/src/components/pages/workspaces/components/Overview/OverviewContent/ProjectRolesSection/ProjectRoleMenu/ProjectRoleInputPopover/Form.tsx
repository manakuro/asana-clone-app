import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { Input as AtomsInput } from '@/components/ui/Input';
import type React from 'react';
import { memo, useCallback, useState } from 'react';

type Props = {
  defaultValue: string;
  initialFocusRef: React.MutableRefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
};

export const Form: React.FC<Props> = memo<Props>((props) => {
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
      <Button ml={2} colorScheme="teal" size="sm" onClick={handleDone}>
        Done
      </Button>
    </Flex>
  );
});
Form.displayName = 'Form';
