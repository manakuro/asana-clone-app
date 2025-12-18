import { useCallback } from 'react';
import { useToast } from '@/hooks';
import { getProjectsURL } from '@/router/projects';

type Props = {
  projectId: string;
};
export const useCopyProjectLink = (props: Props) => {
  const { projectId } = props;
  const { toast } = useToast();

  const copyProjectLink = useCallback(async () => {
    await navigator.clipboard.writeText(getProjectsURL(projectId));
    toast({
      description: 'The project link was copied to your clipboard.',
    });
  }, [projectId, toast]);

  return {
    copyProjectLink,
  };
};
