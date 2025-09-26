import { Divider } from '@/components/features/Navigation/Divider';
import { useHelp } from '@/components/features/Navigation/Help';
import { Icon } from '@/components/ui/Icon';
import { ListItem } from '@/components/ui/List';
import { Text } from '@/components/ui/Text';
import { transitions } from '@/styles';
import type React from 'react';
import { useCallback } from 'react';
import { PADDING_X } from '../Navigation';

export const Help: React.FC = () => {
  const { setIsOpen } = useHelp();

  const handleClick = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <>
      <Divider />
      <ListItem
        display="flex"
        alignItems="center"
        px={PADDING_X}
        py={4}
        _hover={{
          bg: 'navigation.hover.dark',
        }}
        transition={transitions.base()}
        cursor="pointer"
        onClick={handleClick}
      >
        <Icon icon="help" color="primary" mr={PADDING_X} mt="-2px" />
        <Text fontSize="sm">Help & getting started</Text>
      </ListItem>
    </>
  );
};
