import { MenuItem } from '@/components/ui/organisms/Menu';
import {
  useProjectTeammate,
  useProjectTeammatesCommand,
} from '@/store/entities/projectTeammate';
import { memo, useCallback, useMemo } from 'react';

type Props = {
  projectId: string;
  projectTeammateId: string;
};

export const SetProjectOwner = memo(function SetProjectOwner(props: Props) {
  const { projectTeammateId, projectId } = props;
  const { projectTeammate } = useProjectTeammate(projectTeammateId);
  const { setOwnerByProjectIdAndTeammateId, setProjectTeammateById } =
    useProjectTeammatesCommand();

  const isOwner = useMemo(
    () => projectTeammate.isOwner,
    [projectTeammate.isOwner],
  );

  const handleRemoveAsProjectOwner = useCallback(async () => {
    await setProjectTeammateById({ isOwner: false, id: projectTeammateId });
  }, [projectTeammateId, setProjectTeammateById]);

  const handleSetAsProjectOwner = useCallback(async () => {
    await setOwnerByProjectIdAndTeammateId(
      projectId,
      projectTeammate.teammateId,
    );
  }, [projectId, projectTeammate.teammateId, setOwnerByProjectIdAndTeammateId]);

  if (isOwner) {
    return (
      <MenuItem onClick={handleRemoveAsProjectOwner} color="alert">
        Remove as Project Owner
      </MenuItem>
    );
  }

  return (
    <MenuItem onClick={handleSetAsProjectOwner}>Set as Project Owner</MenuItem>
  );
});
