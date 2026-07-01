import { memo } from 'react';
import { useDescriptionTitleInput } from '@/components/features/projects/hooks/use-description-title-input';
import { Flex } from '@/components/ui/flex';
import { InputText } from '@/components/ui/input-text';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export const Input = memo(function Input(props: Props) {
  const { value, onKeyDown, onChange } = useDescriptionTitleInput(props);

  return (
    <Flex flex={1}>
      <InputText
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        inputStyle={{
          fontSize: 'md',
          fontWeight: 'medium',
          minHeight: '38px',
        }}
        placeholder="How we'll collaborate"
        noBorder
      />
    </Flex>
  );
});
