import { memo } from 'react';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Text } from '@/components/ui/Text';
import { PopoverAddCoverImageActions } from './PopoverAddCoverImageActions';

type Props = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};
export const AddCoverImage = memo(function AddCoverImage(props: Props) {
  const { onClose, open } = props;

  return (
    <PopoverAddCoverImageActions
      open={open}
      positioning={{ placement: 'right' }}
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
  );
});
