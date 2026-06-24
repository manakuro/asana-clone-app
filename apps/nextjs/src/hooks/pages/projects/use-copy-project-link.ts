import { useCallback } from 'react';
import { useToaster } from '@/hooks/useToaster';
import { getProjectsURL } from '@/router/projects';

type Props = {
  projectId: string;
};
export const useCopyProjectLink = (props: Props) => {
  const { projectId } = props;
  const { toaster } = useToaster();

  const copyProjectLink = useCallback(async () => {
    await navigator.clipboard.writeText(getProjectsURL(projectId));
    toaster.success({
      description: 'The project link was copied to your clipboard.',
    });
  }, [projectId, toaster.success]);

  return {
    copyProjectLink,
  };
};
