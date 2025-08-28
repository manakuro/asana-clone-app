import { MenuSelectList } from '@/components/features/organisms/Menus';
import {
  type TaskSection,
  useTasksTaskSectionByTaskId,
  useTasksTaskSections,
} from '@/components/features/organisms/Tasks/hooks';
import { MenuItemOption } from '@/components/ui/organisms/Menu';
import type React from 'react';
import { memo } from 'react';

type Props = {
  taskId: string;
};

export const MenuList = memo(function MenuList(props: Props) {
  const { taskSections } = useTasksTaskSections();
  const { taskSection } = useTasksTaskSectionByTaskId(props.taskId);

  return (
    <Component taskSectionId={taskSection.id} taskSections={taskSections} />
  );
});

// TODO: Pass `taskSections` instead of `useTaskSection` because MenuItemOption has issue when its wrapped
type ComponentProps = {
  taskSections: TaskSection[];
  taskSectionId: string;
};
const Component: React.FC<ComponentProps> = memo<ComponentProps>((props) => {
  return (
    <MenuSelectList defaultValue={props.taskSectionId}>
      {props.taskSections.map((t) => (
        <MenuItemOption value={t.id} key={t.id}>
          {t.name}
        </MenuItemOption>
      ))}
    </MenuSelectList>
  );
});
