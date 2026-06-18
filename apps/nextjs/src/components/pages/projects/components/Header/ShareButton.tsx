import { memo, useCallback } from 'react';
import { useShareProjectModal } from '@/components/features/Modals/ShareProjectModal';
import { Button } from '@/components/ui/button';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Tooltip } from '@/components/ui/tooltip';
import { useTooltip } from '@/components/ui/tooltip/use-tooltip';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { useWorkspace } from '@/store/entities/workspace';

type Props = FlexProps;

export const ShareButton = memo(function ShareButton(props: Props) {
  const { projectId } = useProjectsProjectId();
  const { onOpen, setProjectId, setShareTab } = useShareProjectModal();
  const { open, ref } = useTooltip<HTMLButtonElement>();
  const { workspace } = useWorkspace();

  const handleClick = useCallback(() => {
    setProjectId(projectId);
    setShareTab();
    onOpen();
  }, [onOpen, projectId, setProjectId, setShareTab]);

  return (
    <Flex alignItems="center" {...props}>
      <Tooltip
        open={open}
        showArrow
        content={`Members of this ${workspace.name} team can find this project`}
        aria-label="A share button description"
        size="md"
      >
        <Button ref={ref} variant="outline" size="xs" onClick={handleClick}>
          <Icon icon="lockAlt" mt="-1px" size="xs" />
          Share
        </Button>
      </Tooltip>
    </Flex>
  );
});
