import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from '@/components/features/organisms/Menus';
import { Button, Icon } from '@/components/ui/atoms';
import { MenuItemOption } from '@/components/ui/organisms/Menu';
import { useProjectTask } from '@/store/entities/projectTask';
import {
  useProjectTaskSection,
  useProjectsTaskSectionsByProjectId,
} from '@/store/entities/projectTaskSection';
import { memo, useCallback } from 'react';

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
    <MenuSelect onChange={handleChange} placement="bottom-start">
      <MenuSelectButton
        as={Button}
        variant="ghost"
        size="xs"
        cursor="pointer"
        rightIcon={
          <Icon mt="1px" icon="chevronDown" color="text.muted" size="md" />
        }
      >
        {projectTaskSection.name}
      </MenuSelectButton>
      <MenuSelectList>
        {projectTaskSections.map((p) => (
          <MenuItemOption value={p.id} key={p.id}>
            {p.name}
          </MenuItemOption>
        ))}
      </MenuSelectList>
    </MenuSelect>
  );
});
