import type React from 'react';
import { memo, useCallback } from 'react';
import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import { AddCoverImage } from './add-cover-image';
import { CopyTask } from './copy-task';
import { DeleteTask } from './delete-task';
import { DuplicateTask } from './duplicate-task';
import { EditTaskName } from './edit-task-name';
import { MarkComplete } from './mark-complete';
import { OpenInNewTab } from './open-in-new-tab';
import { ViewDetails } from './view-details';

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
