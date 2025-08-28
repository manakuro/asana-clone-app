import { Wrap } from '@/components/ui/atoms';
import { useProjectCommand } from '@/store/entities/project';
import { useProjectIconIds } from '@/store/entities/projectIcon';
import { useCallback } from 'react';
import { IconPickerItem } from './IconPickerItem';

type Props = {
  projectId: string;
  currentProjectIconId: string;
  currentProjectLightColorId: string;
  currentProjectBaseColorId: string;
};

export function IconPicker(props: Props) {
  const { projectIconIds } = useProjectIconIds();
  const { setProject } = useProjectCommand();

  const handleClick = useCallback(
    async (id: string) => {
      await setProject({
        projectId: props.projectId,
        projectIconId: id,
      });
    },
    [props.projectId, setProject],
  );

  return (
    <Wrap p={6} spacing={1} overflowY="scroll" maxH={60}>
      {projectIconIds.map((id) => (
        <IconPickerItem
          key={id}
          projectIconId={id}
          currentProjectIconId={props.currentProjectIconId}
          currentProjectBaseColorId={props.currentProjectBaseColorId}
          currentProjectLightColorId={props.currentProjectLightColorId}
          onClick={handleClick}
        />
      ))}
    </Wrap>
  );
}
