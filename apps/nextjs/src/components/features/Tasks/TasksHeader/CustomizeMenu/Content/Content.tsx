import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { usePathname } from 'next/navigation';
import { memo, useEffect, useMemo } from 'react';
import { Separator } from '@/components/features/Navigation/Separator';
import { useTasksTaskColumnCustomizable } from '@/components/features/Tasks/hooks';
import { Box } from '@/components/ui/box';
import { Drawer } from '@/components/ui/drawer';
import { Flex } from '@/components/ui/flex';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { useDnd } from '@/hooks/dnd/useDnd';
import { isMyTasksBoardURL } from '@/router';
import { useCustomizeMenu } from '../useCustomizeMenu';
import { ListItem } from './ListItem';

const HEADER_HEIGHT = 72;
const TASKS_HEADER_HEIGHT = 60;
const TASKS_HEADER_BOARD_HEIGHT = 40;

export const Content = memo(function Content() {
  const { onClose } = useCustomizeMenu();
  const { tasksTaskColumnIds, setTaskColumnOrder } =
    useTasksTaskColumnCustomizable();
  const { list, handleDnd } = useDnd(tasksTaskColumnIds);
  const pathname = usePathname();
  const top = useMemo<number>(() => {
    if (isMyTasksBoardURL(pathname))
      return HEADER_HEIGHT + TASKS_HEADER_BOARD_HEIGHT;
    return HEADER_HEIGHT + TASKS_HEADER_HEIGHT;
  }, [pathname]);

  useEffect(() => {
    setTaskColumnOrder(list);
  }, [list, setTaskColumnOrder]);

  return (
    <Drawer.Content
      flex={1}
      top={`${top}px !important`}
      borderTop="1px"
      borderLeft="1px"
      borderColor="border"
      borderStyle="solid"
      boxShadow="none"
    >
      <Drawer.CloseTrigger asChild>
        <IconButton
          aria-label="Close button"
          position="absolute"
          top="1.25rem"
          right={3}
          variant="ghost"
          onClick={onClose}
        >
          <Icon icon="arrowToRight" />
        </IconButton>
      </Drawer.CloseTrigger>
      <Drawer.Header fontSize="md" py={6} px={4}>
        <Drawer.Title>Customize</Drawer.Title>
      </Drawer.Header>
      <Separator />

      <DragDropContext onDragEnd={handleDnd}>
        <Droppable droppableId="id">
          {(provided) => (
            <Flex flexDirection="column" h="full">
              <Drawer.Body
                flex={1}
                display="flex"
                flexDirection="column"
                px={4}
              >
                <Heading as="h4" size="xs">
                  Fields
                </Heading>
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  mt={2}
                >
                  {list.map((id, i) => (
                    <ListItem tasksTaskColumnId={id} key={id} index={i} />
                  ))}
                  {provided.placeholder}
                </Box>
              </Drawer.Body>
            </Flex>
          )}
        </Droppable>
      </DragDropContext>
    </Drawer.Content>
  );
});
