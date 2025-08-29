import { Flex, InputText } from '@/components/ui/atoms';
import { useDescriptionTitleInput } from '@/hooks/pages/projects';
import { memo } from 'react';

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
        fontSize="xl"
        fontWeight="bold"
        minH="38px"
        placeholder="How we'll collaborate"
        noBorder
      />
    </Flex>
  );
});
