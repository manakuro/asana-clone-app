import {
  CheckboxField,
  Divider,
  Flex,
  Stack,
  SubmitButton,
  TextField,
} from '@/components/ui/atoms';
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/organisms/Modal';
import { useTask } from '@/store/entities/task';
import { Form, Formik, type FormikConfig } from 'formik';
import { memo, useCallback, useMemo } from 'react';
import { Label } from './Label';

type Props = {
  taskId: string;
};

type Values = {
  name: string;
  includeOption: string[];
};

const INCLUDE_OPTION_TASK_DESCRIPTION = '1';
const INCLUDE_OPTION_ASSIGNEE = '2';
const INCLUDE_OPTION_SUBTASKS = '3';
const INCLUDE_OPTION_TAGS = '4';
const INCLUDE_OPTION_COLLABORATORS = '5';
const INCLUDE_OPTION_PROJECTS = '6';
const INCLUDE_OPTION_DUE_DATE = '7';
const INCLUDE_OPTION_PARENT_TASK = '8';

export const Content = memo(function Content(props: Props) {
  const { task } = useTask(props.taskId);
  const initialValues = useMemo(
    () => ({
      name: `Duplicate of ${task.name}`,
      includeOption: [
        INCLUDE_OPTION_TASK_DESCRIPTION,
        INCLUDE_OPTION_ASSIGNEE,
        INCLUDE_OPTION_SUBTASKS,
        INCLUDE_OPTION_TAGS,
        INCLUDE_OPTION_COLLABORATORS,
        INCLUDE_OPTION_DUE_DATE,
        INCLUDE_OPTION_PARENT_TASK,
      ],
    }),
    [task.name],
  );

  const handleSubmit = useCallback((values: Values) => {
    console.log('values: ', values);
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      <Form>
        <ModalContent>
          <ModalHeader>Duplicate Task</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody py={4}>
            <Flex flexDirection="column">
              <Label>Task Name</Label>
              <TextField name="name" />
            </Flex>
            <Flex flexDirection="column" mt={6}>
              <Label>Include</Label>
              <Stack spacing={2} alignItems="flex-start">
                <CheckboxField
                  value={INCLUDE_OPTION_TASK_DESCRIPTION}
                  name="includeOption"
                >
                  Task Description
                </CheckboxField>
                <CheckboxField
                  value={INCLUDE_OPTION_ASSIGNEE}
                  name="includeOption"
                >
                  Assignee
                </CheckboxField>
                <CheckboxField
                  value={INCLUDE_OPTION_SUBTASKS}
                  name="includeOption"
                >
                  Subtasks
                </CheckboxField>
                <CheckboxField value={INCLUDE_OPTION_TAGS} name="includeOption">
                  Tags
                </CheckboxField>
                <CheckboxField
                  value={INCLUDE_OPTION_COLLABORATORS}
                  name="includeOption"
                >
                  Collaborators
                </CheckboxField>
                <CheckboxField
                  value={INCLUDE_OPTION_PROJECTS}
                  name="includeOption"
                >
                  Projects
                </CheckboxField>
                <CheckboxField
                  value={INCLUDE_OPTION_DUE_DATE}
                  name="includeOption"
                >
                  Due Date
                </CheckboxField>
                <CheckboxField
                  value={INCLUDE_OPTION_PARENT_TASK}
                  name="includeOption"
                >
                  Parent Task
                </CheckboxField>
              </Stack>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <SubmitButton>Create New Task</SubmitButton>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Formik>
  );
});

const validate: FormikConfig<Values>['validate'] = (values) => {
  const errors: Partial<Values> = {};
  if (!values.name) {
    errors.name = 'Task Name Required';
  }

  return errors;
};
