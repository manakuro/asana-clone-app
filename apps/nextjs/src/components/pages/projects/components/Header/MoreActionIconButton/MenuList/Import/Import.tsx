import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
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
