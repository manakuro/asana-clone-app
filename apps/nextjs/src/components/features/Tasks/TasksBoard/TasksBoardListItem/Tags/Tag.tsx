import { memo } from 'react';
import { TagChip } from '@/components/features/Chips';
import type { FlexProps } from '@/components/ui/flex';
import { Tooltip } from '@/components/ui/tooltip';
import { useTaskTag } from '@/store/entities/taskTag';

type Props = FlexProps & {
  taskTagId: string;
};

export const Tag = memo(function Tag(props: Props) {
  const { taskTagId } = props;
  const { taskTag } = useTaskTag(taskTagId);

  return (
    <Tooltip
      showArrow
      content={taskTag.tag.name}
      aria-label={taskTag.tag.name}
      withIcon
      openDelay={500}
    >
      <TagChip taskTagId={taskTagId} variant="icon" />
    </Tooltip>
  );
});
