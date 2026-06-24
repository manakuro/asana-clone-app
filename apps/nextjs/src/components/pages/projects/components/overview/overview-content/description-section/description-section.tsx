import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { Description } from './description';
import { DescriptionTitle } from './description-title';

export const DescriptionSection = memo(function DescriptionSection() {
  const { projectId } = useProjectsProjectId();

  return (
    <Flex flexDirection="column">
      <DescriptionTitle projectId={projectId} />
      <Description projectId={projectId} />
    </Flex>
  );
});
