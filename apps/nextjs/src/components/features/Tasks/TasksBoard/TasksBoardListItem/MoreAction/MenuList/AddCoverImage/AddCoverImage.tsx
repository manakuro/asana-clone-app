import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { PopoverAddCoverImageActions } from './PopoverAddCoverImageActions';

export const AddCoverImage = memo(function AddCoverImage() {
  return (
    <PopoverAddCoverImageActions positioning={{ placement: 'right' }}>
      <Flex flex={1}>
        <Icon icon="photoAlbum" size="sm" color="fg.muted" mt="2px" />
        <Text fontSize="sm" flex={1} ml={2}>
          Add cover image
        </Text>
        <Icon icon="chevronRight" color="fg.muted" />
      </Flex>
    </PopoverAddCoverImageActions>
  );
});
