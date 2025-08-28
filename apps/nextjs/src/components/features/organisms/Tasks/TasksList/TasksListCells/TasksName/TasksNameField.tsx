import { useTaskDetailDrawerRef } from '@/components/features/organisms/TaskDetails';
import { Box, Flex, Input, type InputProps } from '@/components/ui/atoms';
import {
  type UseClickOutsideOptionsHasClickedOutside,
  useClickOutside,
  useDebounce,
  useMountedRef,
} from '@/hooks';
import type React from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTasksNameContext } from './TasksNameProvider';

type Props = {
  value: string;
  onChange: (val: string) => void;
  isNew?: boolean;
  completed?: boolean;
  deleteTask?: () => Promise<void>;
  focusedBorder?: boolean;
} & Omit<InputProps, 'onChange'>;

export const TasksNameField = memo(function TasksNameField(props: Props) {
  const [value, setValue] = useState<string>(props.value);
  const { mountedRef } = useMountedRef();
  const {
    ref: containerRef,
    onInputFocus,
    onInputBlur,
    inputFocused,
    isTransitioning,
  } = useTasksNameContext();
  const { taskDetailListDetailRef } = useTaskDetailDrawerRef();
  const autoFocus = useMemo(() => props.isNew, [props.isNew]);
  const hasClickedOutside =
    useCallback<UseClickOutsideOptionsHasClickedOutside>(
      (e) => {
        if (containerRef.current?.contains(e.target as Node) ?? false)
          return false;
        if (taskDetailListDetailRef?.contains(e.target as Node) ?? false)
          return false;

        return true;
      },
      [containerRef, taskDetailListDetailRef],
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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    if (!mountedRef.current) return;
    setValue(props.value);
  }, [mountedRef, props.value]);

  useEffect(() => {
    if (!mountedRef.current) return;
    if (props.isNew) onInputFocus();
  }, [mountedRef, onInputFocus, props.isNew]);

  useDebounce(value, props.onChange, 500);

  const style = useMemo<InputProps>(() => {
    let val: InputProps = {
      ml: 1,
      fontSize: 'sm',
      color: 'text.base',
      minH: 5,
      h: 5,
      paddingInlineStart: 2,
      paddingInlineEnd: 2,
      border: 'none',
    };
    if (isTransitioning)
      val = {
        ...val,
        color: 'gray.50',
      };

    if (props.focusedBorder)
      val = {
        ...val,
        border: '1px',
        borderColor: 'transparent',
        borderRadius: 'sm',
        _hover: {
          borderColor: 'gray.400',
        },
      };

    if (props.completed)
      val = {
        ...val,
        opacity: 0.4,
      };

    return val;
  }, [isTransitioning, props.focusedBorder, props.completed]);

  return (
    <Flex
      position="relative"
      maxWidth="70%"
      minW={props.isNew || !value ? '150px' : ''}
      ref={ref}
    >
      <Box as="span" {...style} visibility="hidden">
        {value}
      </Box>
      <Input
        onClick={(e) => e.stopPropagation()}
        onChange={handleChange}
        value={value}
        {...style}
        position="absolute"
        top={0}
        focusBorderColor="transparent"
        placeholder={inputFocused ? 'Write a task name' : ''}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        autoFocus={autoFocus}
      />
    </Flex>
  );
});
