import {
  TaskDetailBody,
  TaskDetailFooter,
  TaskDetailHeader,
} from '@/components/features/organisms/TaskDetail';
import { Divider } from '@/components/ui/atoms';
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/organisms/Modal';
import { memo } from 'react';

type Props = {
  loading: boolean;
  onClose: () => void;
};

export const Content = memo(function Content(props: Props) {
  return (
    <ModalContent minH="670px" maxH="670px">
      <ModalHeader p={0}>
        <TaskDetailHeader
          onClose={props.onClose}
          loading={props.loading}
          mode="modal"
        />
      </ModalHeader>
      <Divider />
      <ModalBody p={0} overflowY="auto">
        <TaskDetailBody isMakePublic loading={props.loading} />
      </ModalBody>
      <ModalFooter p={0}>
        <TaskDetailFooter borderBottomRadius="md" loading={props.loading} />
      </ModalFooter>
    </ModalContent>
  );
});
