import { useProjectDetailModal } from '@/components/features/organisms/Modals';
import { Icon, IconButton, type IconButtonProps } from '@/components/ui/atoms';
import { memo, useCallback } from 'react';

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
      icon={<Icon icon="infoCircle" color="text.muted" size="xs" />}
      variant="ghost"
      {...rest}
      h={6}
      w={6}
      onClick={handleClick}
    />
  );
});
