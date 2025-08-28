import { useTaskDetailDrawerRef } from '@/components/features/organisms/TaskDetails';
import { Flex, type InputProps, InputText } from '@/components/ui/atoms';
import {
  type UseClickOutsideOptionsHasClickedOutside,
  useClickOutside,
  useDebounce,
} from '@/hooks';
import type React from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTasksBoardListItemInputContext } from '../Provider';
import { useTasksBoardListItemElement } from '../index';

type Props = {
  taskId: string;
  value: string;
  onChange: (val: string) => void;
  isNew?: boolean;
  deleteTask?: () => Promise<void>;
  focusedBorder?: boolean;
} & Omit<InputProps, 'onChange'>;

export const TasksNameField = memo(function TasksNameField(props: Props) {
  const [value, setValue] = useState<string>(props.value);
  const { getTasksBoardListItemElementById } = useTasksBoardListItemElement();
  const {
    onInputFocus,
    onInputBlur,
    ref: textareaRef,
  } = useTasksBoardListItemInputContext();
  const { taskDetailListDetailRef } = useTaskDetailDrawerRef();
  const autoFocus = useMemo(() => props.isNew, [props.isNew]);
  const hasClickedOutside =
    useCallback<UseClickOutsideOptionsHasClickedOutside>(
      (e) => {
        if (
          getTasksBoardListItemElementById(props.taskId)?.contains(
            e.target as Node,
          ) ??
          false
        )
          return false;
        if (taskDetailListDetailRef?.contains(e.target as Node) ?? false)
          return false;

        return true;
      },
      [getTasksBoardListItemElementById, props.taskId, taskDetailListDetailRef],
    );
  const { ref, removeEventListener } = useClickOutside<HTMLDivElement>(
    async () => {
      if (!value) await props.deleteTask?.();
    },
    {
      skip: !props.isNew,
      hasClickedOutside,
    },
  );

  useEffect(() => {
    if (!props.isNew) removeEventListener();
  }, [props.isNew, removeEventListener]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.code === 'Enter') e.preventDefault();
  }, []);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useDebounce(value, props.onChange, 500);

  return (
    <Flex position="relative" minW="150px" ref={ref}>
      <InputText
        textareaRef={textareaRef}
        value={value}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        fontSize="sm"
        placeholder="Write a task name"
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        autoFocus={autoFocus}
        borderRadius="sm"
        minH="23px"
        containerStyle={{
          ml: 1,
          maxH: 20,
        }}
      />
    </Flex>
  );
});
