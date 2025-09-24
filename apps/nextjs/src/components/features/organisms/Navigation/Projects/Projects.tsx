import { useNavigation } from '@/components/features/organisms/Navigation';
import { Divider } from '@/components/features/organisms/Navigation/Divider';
import { Flex } from '@/components/ui/atoms/Flex';
import { memo } from 'react';
import { ProjectList } from './ProjectList';
import { Teammates } from './Teammates';
import { Workspace } from './Workspace';

export const Projects = memo(function Projects() {
  const { isExpanded } = useNavigation();

  return (
    <>
      <Divider />
      <Flex flexDirection="column" flex={1}>
        <Workspace />
        {isExpanded && <Teammates />}
        <ProjectList />
      </Flex>
    </>
  );
});
