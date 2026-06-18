import { memo } from 'react';
import type { FlexProps } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { ProjectChip } from './ProjectChip';

type Props = FlexProps & {
  projectIds: string[];
};

export const Projects = memo(function Projects(props: Props) {
  const { projectIds } = props;

  if (!projectIds.length) return null;

  return (
    <Stack direction="row" gap={2} mb={4}>
      {projectIds.map((id) => (
        <ProjectChip projectId={id} key={id} />
      ))}
    </Stack>
  );
});
