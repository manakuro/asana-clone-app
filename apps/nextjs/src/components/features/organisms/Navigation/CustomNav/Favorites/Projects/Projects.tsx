import { Flex } from '@/components/ui/atoms/Flex';
import { memo } from 'react';
import { ProjectList } from './ProjectList';

export const Projects = memo(function Projects() {
  return (
    <Flex flexDirection="column" flex={1}>
      <ProjectList />
    </Flex>
  );
});
