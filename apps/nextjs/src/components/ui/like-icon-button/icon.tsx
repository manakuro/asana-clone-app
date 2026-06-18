import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Icon as AtomsIcon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import type { LikeButtonProps } from './like-icon-button';

type Props = Pick<
  LikeButtonProps,
  'hasAnyoneLiked' | 'label' | 'likeLength' | 'textStyle'
>;

export const Icon = memo(function Icon(props: Props) {
  const { hasAnyoneLiked, label, likeLength, textStyle } = props;

  if (hasAnyoneLiked) {
    return (
      <Tooltip
        showArrow
        content={label}
        aria-label="The number of likes of this feed"
        size="sm"
        withIcon
      >
        <Flex alignItems="center" justifyContent="center">
          <Text fontSize="xs" mt={1} color="primary" {...textStyle}>
            {likeLength}
          </Text>
          <AtomsIcon icon="fillLike" color="primary" ml={1} />
        </Flex>
      </Tooltip>
    );
  }

  return <AtomsIcon icon="outlineLike" color="fg.muted" />;
});
