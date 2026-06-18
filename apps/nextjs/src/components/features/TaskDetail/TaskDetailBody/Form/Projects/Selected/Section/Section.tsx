import { memo, useCallback } from 'react';
import {
  MenuSelect,
  MenuSelectList,
  MenuSelectTrigger,
} from '@/components/features/Menus';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';
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
      <MenuSelectTrigger>
        <Button variant="ghost" size="xs" cursor="pointer">
          {projectTaskSection.name}
          <Icon mt="1px" icon="chevronDown" color="fg.muted" size="md" />
        </Button>
      </MenuSelectTrigger>
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
