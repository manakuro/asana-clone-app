import { Flex } from '@/components/ui/Flex';
import { InputText } from '@/components/ui/InputText';
import { useDescriptionTitleInput } from '@/hooks/pages/projects';
import type React from 'react';
import { memo } from 'react';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { value, onKeyDown, onChange } = useDescriptionTitleInput(props);

  return (
    <Flex flex={1}>
      <InputText
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        fontSize="xl"
        fontWeight="bold"
        minH="38px"
        placeholder="How we'll collaborate"
        noBorder
      />
    </Flex>
  );
});
Input.displayName = 'Input';
