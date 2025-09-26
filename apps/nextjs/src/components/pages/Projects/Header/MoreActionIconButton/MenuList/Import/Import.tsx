import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { MenuItem } from '@/components/ui/Menu';
import { Text } from '@/components/ui/Text';
import { memo } from 'react';
import { PopoverImportActions } from './PopoverImportActions';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  isOpen: boolean;
  projectId: string;
};

export const Import = memo(function Import(props: Props) {
  const { onMouseEnter, isOpen, onClose } = props;

  return (
    <MenuItem onMouseEnter={onMouseEnter}>
      <PopoverImportActions isOpen={isOpen} placement="right" onClose={onClose}>
        <Flex flex={1}>
          <Text fontSize="sm" flex={1}>
            Import
          </Text>
          <Icon icon="chevronRight" />
        </Flex>
      </PopoverImportActions>
    </MenuItem>
  );
});
