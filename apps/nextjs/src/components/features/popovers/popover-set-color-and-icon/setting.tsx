import { Checkbox } from '@/components/ui/checkbox';
import { Flex } from '@/components/ui/flex';

type Props = {
  isSetForEveryone: boolean;
};

export function Setting(props: Props) {
  return (
    <Flex px={6} py={4}>
      <Checkbox.Root
        defaultChecked={props.isSetForEveryone}
        cursor="pointer"
        colorPalette="teal"
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label fontSize="xs">Set for everyone</Checkbox.Label>
      </Checkbox.Root>
    </Flex>
  );
}
