import { memo } from 'react';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';

import { Text } from '@/components/ui/Text';
import { PopoverExportAndPrintActions } from './PopoverExportAndPrintActions';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  open: boolean;
  projectId: string;
};

export const ExportAndPrint = memo(function ExportAndPrint(props: Props) {
  const { open, onClose } = props;

  return (
    <PopoverExportAndPrintActions
      open={open}
      positioning={{ placement: 'right' }}
      onClose={onClose}
    >
      <Flex flex={1}>
        <Text fontSize="sm" flex={1}>
          Export/Print
        </Text>
        <Icon icon="chevronRight" />
      </Flex>
    </PopoverExportAndPrintActions>
  );
});
