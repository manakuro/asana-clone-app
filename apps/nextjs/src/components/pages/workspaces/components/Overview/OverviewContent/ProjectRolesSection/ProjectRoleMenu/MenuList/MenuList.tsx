import { memo } from 'react';
import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import { AddRole } from './AddRole';
import { RemoveFromProject } from './RemoveFromProject';
import { SetProjectOwner } from './SetProjectOwner';

type Props = {
  projectId: string;
  projectTeammateId: string;
  onOpenPopover: () => void;
};

export const MenuList = memo(function MenuList(props: Props) {
  const { projectId, projectTeammateId, onOpenPopover } = props;

  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <AddRole
            projectId={projectId}
            projectTeammateId={projectTeammateId}
            onOpenPopover={onOpenPopover}
          />
          <SetProjectOwner
            projectId={projectId}
            projectTeammateId={projectTeammateId}
          />
          <RemoveFromProject />
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
});
