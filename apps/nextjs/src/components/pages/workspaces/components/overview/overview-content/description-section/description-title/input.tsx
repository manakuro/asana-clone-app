import type React from 'react';
import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { InputText } from '@/components/ui/input-text';
import { useDescriptionTitleInput } from '@/hooks/pages/projects';

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
        inputStyle={{
          fontSize: 'xl',
          fontWeight: 'bold',
          minH: '38px',
        }}
        placeholder="How we'll collaborate"
        noBorder
      />
    </Flex>
  );
});
Input.displayName = 'Input';
