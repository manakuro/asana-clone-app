import { memo } from 'react';
import { useNavigation } from '@/components/layout/navigation';
import { Separator } from '@/components/layout/navigation/separator';
import { Flex } from '@/components/ui/flex';
import { ProjectList } from './project-list';
import { Teammates } from './teammates';
import { Workspace } from './workspace';

export const Projects = memo(function Projects() {
  const { isExpanded } = useNavigation();

  return (
    <>
      <Separator />
      <Flex flexDirection="column" flex={1}>
        <Workspace />
        {isExpanded && <Teammates />}
        <ProjectList />
      </Flex>
    </>
  );
});
