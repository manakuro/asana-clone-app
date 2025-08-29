import { Box, PortalManager } from '@/components/ui/atoms';
import { Menu } from '@/components/ui/organisms/Menu';
import { useDisclosure } from '@/shared/chakra';
import { type PropsWithChildren, memo } from 'react';
import { MenuList } from './MenuList';
import { ProjectRoleInputPopover } from './ProjectRoleInputPopover';

type Props = PropsWithChildren<{
  projectId: string;
  projectTeammateId: string;
}>;

export const ProjectRoleMenu = memo(function ProjectRoleMenu(props: Props) {
  const disclosurePopover = useDisclosure();

  return (
    <ProjectRoleInputPopover
      isOpen={disclosurePopover.isOpen}
      onClose={disclosurePopover.onClose}
      projectId={props.projectId}
      projectTeammateId={props.projectTeammateId}
    >
      <PortalManager zIndex={1500}>
        <Box w="full">
          <Menu placement="bottom-start" isLazy>
            {props.children}
            <MenuList
              projectId={props.projectId}
              projectTeammateId={props.projectTeammateId}
              onOpenPopover={disclosurePopover.onOpen}
            />
          </Menu>
        </Box>
      </PortalManager>
    </ProjectRoleInputPopover>
  );
});
