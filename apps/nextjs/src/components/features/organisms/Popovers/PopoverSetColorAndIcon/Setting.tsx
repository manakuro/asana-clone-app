import { Checkbox } from '@/components/ui/Checkbox';
import { Flex } from '@/components/ui/Flex';
import { Text } from '@/components/ui/Text';

type Props = {
  isSetForEveryone: boolean;
};

export function Setting(props: Props) {
  return (
    <Flex px={6} py={4}>
      <Checkbox defaultChecked={props.isSetForEveryone}>
        <Text fontSize="xs">Set for everyone</Text>
      </Checkbox>
    </Flex>
  );
}
