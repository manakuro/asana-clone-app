import { MenuList as AtomsMenuList } from '@/components/ui/organisms/Menu';
import { memo } from 'react';
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
    <AtomsMenuList>
      <AddRole
        projectId={projectId}
        projectTeammateId={projectTeammateId}
        onOpenPopover={onOpenPopover}
      />
      <SetProjectOwner
        projectId={projectId}
        projectTeammateId={projectTeammateId}
      />
      <RemoveFromProject
        projectId={projectId}
        projectTeammateId={projectTeammateId}
      />
    </AtomsMenuList>
  );
});
