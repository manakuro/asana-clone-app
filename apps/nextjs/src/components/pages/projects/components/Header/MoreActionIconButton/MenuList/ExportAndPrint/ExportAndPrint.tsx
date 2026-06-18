import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { PopoverExportAndPrintActions } from './PopoverExportAndPrintActions';

export const ExportAndPrint = memo(function ExportAndPrint() {
  return (
    <PopoverExportAndPrintActions positioning={{ placement: 'right' }}>
      <Flex flex={1}>
        <Text fontSize="sm" flex={1}>
          Export/Print
        </Text>
        <Icon icon="chevronRight" />
      </Flex>
    </PopoverExportAndPrintActions>
  );
});
