import { memo } from 'react';
import { useNavigation } from '@/components/features/Navigation';
import { Separator } from '@/components/features/Navigation/Separator';
import { Flex } from '@/components/ui/flex';
import { ProjectList } from './ProjectList';
import { Teammates } from './Teammates';
import { Workspace } from './Workspace';

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
