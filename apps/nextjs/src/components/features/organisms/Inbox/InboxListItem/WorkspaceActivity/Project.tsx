import { Flex, type FlexProps, Icon, Link } from '@/components/ui/atoms';
import { useProject } from '@/store/entities/project';
import { transitions } from '@/styles';
import type React from 'react';
import { memo, useCallback } from 'react';

type Props = FlexProps & {
  projectId: string;
};

export const Project = memo(function Project(props: Props) {
  const { projectId } = props;
  const { project } = useProject(projectId);

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <Flex flex={1} mt={1}>
      <Flex alignItems="center">
        <Icon icon="outlineProject" color="text.muted" />
        <Link
          mt="2px"
          fontSize="md"
          fontWeight="medium"
          ml={2}
          transition={transitions.base()}
          hover
          onClick={handleClick}
        >
          {project.name}
        </Link>
      </Flex>
    </Flex>
  );
});
