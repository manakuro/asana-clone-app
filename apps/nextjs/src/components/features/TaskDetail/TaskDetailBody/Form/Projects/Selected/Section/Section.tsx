import { memo, useCallback } from 'react';
import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from '@/components/features/Menus';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';
import { useProjectTask } from '@/store/entities/projectTask';
import {
  useProjectsTaskSectionsByProjectId,
  useProjectTaskSection,
} from '@/store/entities/projectTaskSection';

type Props = {
  taskId: string;
  projectTaskId: string;
  onChange: (input: {
    projectTaskId: string;
    projectTaskSectionId: string;
  }) => void;
};

export const Section = memo(function Section(props: Props) {
  const { projectTaskId, onChange } = props;
  const { projectTask } = useProjectTask(projectTaskId);
  const { projectTaskSection } = useProjectTaskSection(
    projectTask.projectTaskSectionId,
  );
  const { projectTaskSections } = useProjectsTaskSectionsByProjectId(
    projectTask.projectId,
  );

  const handleChange = useCallback(
    (projectTaskSectionId: string) => {
      onChange({
        projectTaskId: projectTask.id,
        projectTaskSectionId,
      });
    },
    [onChange, projectTask.id],
  );

  return (
    <MenuSelect
      onChange={handleChange}
      positioning={{ placement: 'bottom-start' }}
    >
      <MenuSelectButton variant="ghost" size="xs" cursor="pointer">
        {projectTaskSection.name}
        <Icon mt="1px" icon="chevronDown" color="text.muted" size="md" />
      </MenuSelectButton>
      <MenuSelectList>
        {projectTaskSections.map((p) => (
          <Menu.RadioItem value={p.id} key={p.id}>
            {p.name}
            <Menu.ItemIndicator />
          </Menu.RadioItem>
        ))}
      </MenuSelectList>
    </MenuSelect>
  );
});
