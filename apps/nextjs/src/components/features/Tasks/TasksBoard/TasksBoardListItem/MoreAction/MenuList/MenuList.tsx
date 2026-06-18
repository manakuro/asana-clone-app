import type React from 'react';
import { memo, useCallback } from 'react';
import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import { AddCoverImage } from './AddCoverImage';
import { CopyTask } from './CopyTask';
import { DeleteTask } from './DeleteTask';
import { DuplicateTask } from './DuplicateTask';
import { EditTaskName } from './EditTaskName';
import { MarkComplete } from './MarkComplete';
import { OpenInNewTab } from './OpenInNewTab';
import { ViewDetails } from './ViewDetails';

type Props = {
  taskId: string;
};
export const MenuList = memo(function MenuList(props: Props) {
  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLElement>) => e.stopPropagation(),
    [],
  );

  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content zIndex="tooltip" onClick={stopPropagation}>
          <EditTaskName />
          <AddCoverImage />
          <Menu.Separator />
          <MarkComplete taskId={props.taskId} />
          <ViewDetails taskId={props.taskId} />
          <OpenInNewTab />
          <Menu.Separator />
          <DuplicateTask />
          <CopyTask taskId={props.taskId} />
          <Menu.Separator />
          <DeleteTask taskId={props.taskId} />
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
});
