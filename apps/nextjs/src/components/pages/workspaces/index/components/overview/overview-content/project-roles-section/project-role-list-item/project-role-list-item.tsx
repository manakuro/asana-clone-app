import { useMemo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useProjectTeammate } from '@/features/project/store/project-teammate';
import { TeammateAvatar } from '@/features/teammate/components/teammate-avatar';
import { useTeammate } from '@/features/teammate/store/teammate';
import { useHover } from '@/hooks/use-hover';
import { ProjectRoleMenu } from '../project-role-menu';
import { Button } from './button';

type Props = {
  projectTeammateId: string;
  projectId: string;
};

export function ProjectRoleListItem(props: Props) {
  const { projectId, projectTeammateId } = props;
  const { projectTeammate, role } = useProjectTeammate(projectTeammateId);
  const { teammate } = useTeammate(projectTeammate.teammateId);
  const { ref, isHovering } = useHover<HTMLDivElement>();

  const roleText = useMemo(() => {
    if (!role) return '+ Add role';
    return role;
  }, [role]);

  return (
    <Flex flexDirection="column" ref={ref} cursor="pointer">
      <ProjectRoleMenu
        projectId={projectId}
        projectTeammateId={projectTeammateId}
      >
        <Button>
          <Flex alignItems="center" textAlign="left">
            <TeammateAvatar teammateId={teammate.id} size="sm" />
            <Flex
              flex={1}
              ml={2}
              flexDirection="column"
              justifyContent="center"
              minW="1px"
            >
              <Text fontSize="sm" fontWeight="medium" lineClamp={1}>
                {teammate.name}
              </Text>
              <Text fontSize="xs" color="fg.muted" mt={1}>
                {roleText}
              </Text>
            </Flex>
            {isHovering && (
              <Flex
                ml="auto"
                w={4}
                h="full"
                justifyContent="center"
                alignItems="center"
              >
                <Icon icon="chevronDown" color="fg.muted" />
              </Flex>
            )}
          </Flex>
        </Button>
      </ProjectRoleMenu>
    </Flex>
  );
}
