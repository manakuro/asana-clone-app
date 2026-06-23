import { memo } from 'react';
import { useNavigation } from '@/components/features/navigation';
import { Separator } from '@/components/features/navigation/separator';
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
