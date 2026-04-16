import { memo } from 'react';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Text } from '@/components/ui/Text';
import { PopoverImportActions } from './PopoverImportActions';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  open: boolean;
  projectId: string;
};

export const Import = memo(function Import(props: Props) {
  const { open, onClose } = props;

  return (
    <PopoverImportActions
      open={open}
      positioning={{ placement: 'right' }}
      onClose={onClose}
    >
      <Flex flex={1}>
        <Text fontSize="sm" flex={1}>
          Import
        </Text>
        <Icon icon="chevronRight" />
      </Flex>
    </PopoverImportActions>
  );
});
