import { MenuItem } from '@/components/ui/organisms/Menu';
import { useProjectTeammate } from '@/store/entities/projectTeammate';
import { memo, useCallback, useMemo } from 'react';

type Props = {
  projectId: string;
  projectTeammateId: string;
  onOpenPopover: () => void;
};

export const AddRole = memo(function AddRole(props: Props) {
  const { onOpenPopover, projectTeammateId } = props;
  const { role } = useProjectTeammate(projectTeammateId);

  const text = useMemo(() => {
    if (!role) return 'Add role';
    return 'Change role';
  }, [role]);

  const handleClick = useCallback(() => {
    onOpenPopover();
  }, [onOpenPopover]);

  return <MenuItem onClick={handleClick}>{text}</MenuItem>;
});
