import { memo, type PropsWithChildren } from 'react';
import { Menu } from '@/components/ui/menu';
import { useDisclosure } from '@/shared/chakra';
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
      open={disclosurePopover.open}
      onClose={disclosurePopover.onClose}
      projectId={props.projectId}
      projectTeammateId={props.projectTeammateId}
    >
      <Menu.Root positioning={{ placement: 'bottom-start' }} lazyMount>
        {props.children}
        <MenuList
          projectId={props.projectId}
          projectTeammateId={props.projectTeammateId}
          onOpenPopover={disclosurePopover.onOpen}
        />
      </Menu.Root>
    </ProjectRoleInputPopover>
  );
});
