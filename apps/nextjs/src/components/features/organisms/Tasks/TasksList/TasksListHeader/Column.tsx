import { useTasksTaskColumn } from '@/components/features/organisms/Tasks/hooks';
import { useTaskColumn } from '@/store/entities/taskColumn';
import { TaskColumnType } from '@/store/entities/taskColumn';
import { memo } from 'react';
import {
  Assignee,
  DueDate,
  Priority,
  Projects,
  Tags,
  TaskName,
} from './Columns';

type Props = {
  tasksTaskColumnId: string;
};

export const Column = memo(function Column(props: Props) {
  const { tasksTaskColumnId } = props;
  const { tasksTaskColumn } = useTasksTaskColumn(tasksTaskColumnId);
  const { taskColumn } = useTaskColumn(tasksTaskColumn.taskColumnId);

  switch (taskColumn.type) {
    case TaskColumnType.TaskName: {
      return <TaskName tasksTaskColumnId={tasksTaskColumnId} />;
    }
    case TaskColumnType.Assignee: {
      return <Assignee tasksTaskColumnId={tasksTaskColumnId} />;
    }
    case TaskColumnType.DueDate: {
      return <DueDate tasksTaskColumnId={tasksTaskColumnId} />;
    }
    case TaskColumnType.Project: {
      return <Projects tasksTaskColumnId={tasksTaskColumnId} />;
    }
    case TaskColumnType.Tags: {
      return <Tags tasksTaskColumnId={tasksTaskColumnId} />;
    }
    case TaskColumnType.Priority: {
      return <Priority tasksTaskColumnId={tasksTaskColumnId} />;
    }
    case TaskColumnType.Custom: {
      return null;
    }
  }

  return null;
});
