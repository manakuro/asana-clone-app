import { memo } from 'react';
import { MenuSelectList } from '@/components/features/Menus';
import {
  type TaskSection,
  useTasksTaskSectionByTaskId,
  useTasksTaskSections,
} from '@/components/features/Tasks/hooks';
import { Menu } from '@/components/ui/menu';

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

type ComponentProps = {
  taskSections: TaskSection[];
  taskSectionId: string;
};
const Component = memo<ComponentProps>((props) => {
  return (
    <MenuSelectList value={props.taskSectionId}>
      {props.taskSections.map((t) => (
        <Menu.RadioItem value={t.id} key={t.id}>
          {t.name}
          <Menu.ItemIndicator />
        </Menu.RadioItem>
      ))}
    </MenuSelectList>
  );
});
