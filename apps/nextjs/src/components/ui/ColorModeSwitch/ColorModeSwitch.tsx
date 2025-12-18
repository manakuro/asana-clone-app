import { useColorMode } from '@chakra-ui/color-mode';
import { Button } from '@/components/ui/Button';
import { Flex, type FlexProps } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';

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
