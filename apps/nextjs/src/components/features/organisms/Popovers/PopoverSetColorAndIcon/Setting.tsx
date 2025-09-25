import { Checkbox } from '@/components/ui/atoms/Checkbox';
import { Flex } from '@/components/ui/atoms/Flex';
import { Text } from '@/components/ui/atoms/Text';

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
