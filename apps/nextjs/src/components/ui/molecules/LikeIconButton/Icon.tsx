import { Icon as AtomsIcon, Flex, Text } from '@/components/ui/atoms';
import { Tooltip } from '@/components/ui/molecules';
import { memo } from 'react';
import type { LikeButtonProps } from './LikeIconButton';

type Props = Pick<
  LikeButtonProps,
  'hasAnyoneLiked' | 'label' | 'likeLength' | 'textStyle'
>;

export const Icon = memo(function Icon(props: Props) {
  const { hasAnyoneLiked, label, likeLength, textStyle } = props;

  if (hasAnyoneLiked) {
    return (
      <Tooltip
        hasArrow
        label={label}
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

  return <AtomsIcon icon="outlineLike" color="text.muted" />;
});
