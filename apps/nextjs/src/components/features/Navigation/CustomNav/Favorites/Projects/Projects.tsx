import { memo } from 'react';
import { Flex } from '@/components/ui/Flex';
import { ProjectList } from './ProjectList';

export const Projects = memo(function Projects() {
  return (
    <Flex flexDirection="column" flex={1}>
      <ProjectList />
    </Flex>
  );
});
