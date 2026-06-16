import { memo } from 'react';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Text } from '@/components/ui/Text';
import { PopoverImportActions } from './PopoverImportActions';

export const Import = memo(function Import() {
  return (
    <PopoverImportActions positioning={{ placement: 'right' }}>
      <Flex flex={1}>
        <Text fontSize="sm" flex={1}>
          Import
        </Text>
        <Icon icon="chevronRight" />
      </Flex>
    </PopoverImportActions>
  );
});
