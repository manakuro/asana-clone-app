import { Button } from '@/components/ui/atoms';
import { Flex, type FlexProps } from '@/components/ui/atoms/Flex';
import { Icon } from '@/components/ui/atoms/Icon';
import { useColorMode } from '@chakra-ui/color-mode';

type Props = FlexProps;

export function ColorModeSwitch(props: Props) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex {...props}>
      <Button onClick={toggleColorMode} variant="ghost">
        <Icon icon={colorMode === 'light' ? 'moon' : 'sun'} />
      </Button>
    </Flex>
  );
}
