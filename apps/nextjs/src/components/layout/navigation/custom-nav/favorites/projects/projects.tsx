import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { ProjectList } from './project-list';

export const Projects = memo(function Projects() {
  return (
    <Flex flexDirection="column" flex={1}>
      <ProjectList />
    </Flex>
  );
});
