import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { MenuItem } from '@/components/ui/Menu';
import { Text } from '@/components/ui/Text';
import { memo } from 'react';
import { PopoverExportAndPrintActions } from './PopoverExportAndPrintActions';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  isOpen: boolean;
  projectId: string;
};

export const ExportAndPrint = memo(function ExportAndPrint(props: Props) {
  const { onMouseEnter, isOpen, onClose } = props;

  return (
    <MenuItem onMouseEnter={onMouseEnter}>
      <PopoverExportAndPrintActions
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <Flex flex={1}>
          <Text fontSize="sm" flex={1}>
            Export/Print
          </Text>
          <Icon icon="chevronRight" />
        </Flex>
      </PopoverExportAndPrintActions>
    </MenuItem>
  );
});
