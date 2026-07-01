import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { CheckIcon as AtomsCheckIcon } from '@/components/ui/check-icon';
import type { IconProps } from '@/components/ui/icon';
import type { SystemStyleObject } from '@/shared/chakra';
import { useProject } from '@/store/entities/project';
import { useTask } from '@/store/entities/task';

type Props = {
  taskId: string;
  projectId: string;
  isHovering: boolean;
} & Omit<IconProps, 'icon'>;

export const CheckIcon = memo(function CheckIcon(props: Props) {
  const { taskId, isHovering, projectId } = props;
  const { task, setTask } = useTask(taskId);
  const { project } = useProject(projectId);

  const handleToggleDone = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      await setTask({ completed: !task.completed });
    },
    [task, setTask],
  );

  const colorStyle = useMemo((): SystemStyleObject => {
    if (!project.id) return {};

    return {
      color: 'white',
    };
  }, [project.id]);

  return (
    <AtomsCheckIcon
      completed={task.completed}
      onClick={handleToggleDone}
      marginLeft={isHovering ? 0 : '-25px'}
      {...colorStyle}
    />
  );
});
