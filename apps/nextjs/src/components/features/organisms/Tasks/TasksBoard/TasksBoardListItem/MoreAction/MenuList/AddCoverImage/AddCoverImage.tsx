import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { MenuItem } from '@/components/ui/Menu';
import { Text } from '@/components/ui/Text';
import { memo } from 'react';
import { PopoverAddCoverImageActions } from './PopoverAddCoverImageActions';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
export const AddCoverImage = memo(function AddCoverImage(props: Props) {
  const { onClose, onOpen, isOpen } = props;

  return (
    <MenuItem onMouseEnter={onOpen} isDisabled>
      <PopoverAddCoverImageActions
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <Flex flex={1}>
          <Icon icon="photoAlbum" size="sm" color="text.muted" mt="2px" />
          <Text fontSize="sm" flex={1} ml={2}>
            Add cover image
          </Text>
          <Icon icon="chevronRight" color="text.muted" />
        </Flex>
      </PopoverAddCoverImageActions>
    </MenuItem>
  );
});
