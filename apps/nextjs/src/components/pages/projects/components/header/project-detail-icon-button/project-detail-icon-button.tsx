import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/icon';
import { IconButton, type IconButtonProps } from '@/components/ui/icon-button';
import { useProjectDetailModal } from '@/features/projects/components/project-detail-modal/use-project-detail-modal';

type Props = {
  projectId: string;
} & Omit<IconButtonProps, 'aria-label'>;

export const ProjectDetailIconButton = memo(function ProjectDetailIconButton(
  props: Props,
) {
  const { projectId, ...rest } = props;
  const { onOpen, setProjectId } = useProjectDetailModal();

  const handleClick = useCallback(() => {
    setProjectId(projectId);
    onOpen();
  }, [onOpen, projectId, setProjectId]);

  return (
    <IconButton
      aria-label="Project detail"
      variant="ghost"
      {...rest}
      h={6}
      w={6}
      onClick={handleClick}
    >
      <Icon icon="infoCircle" color="fg.muted" size="xs" />
    </IconButton>
  );
});
