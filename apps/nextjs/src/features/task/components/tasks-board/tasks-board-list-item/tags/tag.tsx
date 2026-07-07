import { memo } from 'react';
import type { FlexProps } from '@/components/ui/flex';
import { Tooltip } from '@/components/ui/tooltip';
import { TagChip } from '@/features/task/components/tag-chip';
import { useTaskTag } from '@/features/task/store/task-tag';

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
