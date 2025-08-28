import { Divider } from '@/components/features/organisms/Navigation/Divider';
import { useTasksTaskColumnCustomizable } from '@/components/features/organisms/Tasks/hooks';
import { Box, Flex, Heading, Icon, IconButton } from '@/components/ui/atoms';
import {
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from '@/components/ui/organisms/Drawer';
import { useDnd } from '@/hooks/dnd/useDnd';
import { isMyTasksBoardURL, useRouter } from '@/router';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import type React from 'react';
import { memo, useEffect, useMemo } from 'react';
import { useCustomizeMenu } from '../useCustomizeMenu';
import { ListItem } from './ListItem';

const HEADER_HEIGHT = 72;
const TASKS_HEADER_HEIGHT = 60;
const TASKS_HEADER_BOARD_HEIGHT = 40;

export const Content: React.FC = memo(() => {
  const { onClose } = useCustomizeMenu();
  const { tasksTaskColumnIds, setTaskColumnOrder } =
    useTasksTaskColumnCustomizable();
  const { list, handleDnd } = useDnd(tasksTaskColumnIds);
  const { router } = useRouter();
  const top = useMemo<number>(() => {
    if (isMyTasksBoardURL(router))
      return HEADER_HEIGHT + TASKS_HEADER_BOARD_HEIGHT;
    return HEADER_HEIGHT + TASKS_HEADER_HEIGHT;
  }, [router]);

  useEffect(() => {
    setTaskColumnOrder(list);
  }, [list, setTaskColumnOrder]);

  return (
    <DrawerContent
      flex={1}
      top={`${top}px !important`}
      borderTop="1px"
      borderLeft="1px"
      borderColor="gray.200"
      boxShadow="none"
    >
      <IconButton
        aria-label="Close button"
        icon={<Icon icon="arrowToRight" />}
        position="absolute"
        top="1.25rem"
        right={3}
        variant="ghost"
        onClick={onClose}
      />
      <DrawerHeader fontSize="md" py={6} px={4}>
        Customize
      </DrawerHeader>
      <Divider />

      <DragDropContext onDragEnd={handleDnd}>
        <Droppable droppableId="id">
          {(provided) => (
            <Flex flexDirection="column" h="full">
              <DrawerBody flex={1} display="flex" flexDirection="column" px={4}>
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
              </DrawerBody>
            </Flex>
          )}
        </Droppable>
      </DragDropContext>
    </DrawerContent>
  );
});
