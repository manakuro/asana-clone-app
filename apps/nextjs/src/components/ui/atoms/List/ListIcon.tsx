import { Icon } from '@/components/ui/atoms';
import type { IconType } from '@/shared/icons';
import { ListIcon as ChakraListIcon } from '@chakra-ui/react';
import type React from 'react';

type Props = React.ComponentProps<typeof ChakraListIcon> & {
  icon: IconType;
};

export function ListIcon(props: Props) {
  return (
    <ChakraListIcon as={() => <Icon icon={props.icon} mr={2} />} {...props} />
  );
}
