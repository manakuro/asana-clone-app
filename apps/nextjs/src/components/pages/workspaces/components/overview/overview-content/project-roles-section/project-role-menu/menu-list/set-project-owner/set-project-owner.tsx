import { memo, useCallback, useMemo } from 'react';
import { Menu } from '@/components/ui/menu';
import {
  useProjectTeammate,
  useProjectTeammatesCommand,
} from '@/store/entities/projectTeammate';

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
      <Menu.Item
        value="Remove as Project Owner"
        onSelect={handleRemoveAsProjectOwner}
        color="alert"
      >
        Remove as Project Owner
      </Menu.Item>
    );
  }

  return (
    <Menu.Item value="Set as Project Owner" onSelect={handleSetAsProjectOwner}>
      Set as Project Owner
    </Menu.Item>
  );
});
