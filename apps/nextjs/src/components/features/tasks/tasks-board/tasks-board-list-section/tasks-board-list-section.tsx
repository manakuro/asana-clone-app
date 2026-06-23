import { memo } from 'react';
import { useTasksTaskIdsByTaskSectionId } from '@/components/features/tasks/hooks';
import { Flex } from '@/components/ui/flex';
import { transitions } from '@/styles/transitions';
import { TasksBoardListItem } from '../tasks-board-list-item';
import { AddTask } from './add-task';
import { AddTaskSection } from './add-task-section';
import { Header } from './header';
import { Provider } from './provider';
import { useTasksBoardListSectionElement } from './use-tasks-board-list-section-element';

type Props = {
  taskSectionId: string;
  showAddButton: boolean;
};
export const TasksBoardListSection = memo(function TasksBoardListSection(
  props: Props,
) {
  return (
    <Provider taskSectionId={props.taskSectionId}>
      <Component {...props} />
    </Provider>
  );
});

const TOP = 72 + 40 + 8 + 8 + 36; // Header + List Header + padding + padding + List Section
const Component = memo(function Component(props: Props) {
  const { taskIds } = useTasksTaskIdsByTaskSectionId(props.taskSectionId);
  const { className } = useTasksBoardListSectionElement();

  return (
    <>
      <Flex
        className={className}
        flexDirection="column"
        w="304px"
        maxW="304px"
        h="full"
        px={3}
        py={2}
        transition={transitions.base()}
      >
        <Header taskSectionId={props.taskSectionId} />
        <Flex
          flexDirection="column"
          overflowY="scroll"
          pb={20}
          position="relative"
          maxH={`calc(100vh - ${TOP}px)`}
          minH={`calc(100vh - ${TOP}px)`}
        >
          {taskIds.length > 0 && (
            <>
              {taskIds.map((id) => (
                <TasksBoardListItem taskId={id} key={id} />
              ))}
              <AddTask taskSectionId={props.taskSectionId} />
            </>
          )}
          {taskIds.length === 0 && (
            <Flex
              bgGradient="linear(to-b, gray.100, gray.50)"
              borderRadius="md"
              w="full"
              h="calc(100% - 8px)"
              position="absolute"
              top={2}
              left={0}
              pt={2}
              px={2}
            >
              <AddTask
                taskSectionId={props.taskSectionId}
                w="full"
                _hover={{
                  bg: 'gray.200',
                }}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
      {props.showAddButton && <AddTaskSection />}
    </>
  );
});
