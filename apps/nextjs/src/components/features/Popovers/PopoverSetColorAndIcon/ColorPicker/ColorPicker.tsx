import { useCallback } from 'react';
import { Wrap } from '@/components/ui/wrap';
import { useProjectCommand } from '@/store/entities/project';
import { useProjectBaseColorIds } from '@/store/entities/projectBaseColor';
import { ColorPickerItem } from './ColorPickerItem';

type Props = {
  currentProjectBaseColorId: string;
  projectId: string;
};

export function ColorPicker(props: Props) {
  const { projectBaseColorIds } = useProjectBaseColorIds();
  const { setProject } = useProjectCommand();

  const handleClick = useCallback(
    async (id: string) => {
      await setProject({
        projectId: props.projectId,
        projectBaseColorId: id,
      });
    },
    [props.projectId, setProject],
  );

  return (
    <Wrap p={6} gap={1}>
      {projectBaseColorIds.map((id) => (
        <ColorPickerItem
          key={id}
          projectBaseColorId={id}
          currentProjectBaseColorId={props.currentProjectBaseColorId}
          onClick={handleClick}
        />
      ))}
    </Wrap>
  );
}
