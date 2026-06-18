import { memo } from 'react';
import {
  TaskDetailBody,
  TaskDetailFooter,
  TaskDetailHeader,
} from '@/components/features/TaskDetail';
import { Dialog } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

type Props = {
  loading: boolean;
  onClose: () => void;
};

export const Content = memo(function Content(props: Props) {
  return (
    <Dialog.Content minH="670px" maxH="670px">
      <Dialog.Header p={0}>
        <TaskDetailHeader
          onClose={props.onClose}
          loading={props.loading}
          mode="modal"
        />
      </Dialog.Header>
      <Separator />
      <Dialog.Body p={0} overflowY="auto">
        <TaskDetailBody isMakePublic loading={props.loading} />
      </Dialog.Body>
      <Dialog.Footer p={0}>
        <TaskDetailFooter borderBottomRadius="md" loading={props.loading} />
      </Dialog.Footer>
    </Dialog.Content>
  );
});
