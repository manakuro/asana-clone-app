import { memo } from 'react';
import { useProjectsProjectId } from '@/components/pages/projects/index/store/projects/project';
import { Flex } from '@/components/ui/flex';
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
