import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from 'react';
import { useTasksListContext } from '@/features/task/components/tasks-list/context';
import type { TasksListCellProps } from '@/features/task/components/tasks-list/tasks-list-cell';

export type UseInputFocus = {
  inputFocused: boolean;
  setInputFocused: Dispatch<SetStateAction<boolean>>;
  cellStyle?: TasksListCellProps;
  onInputFocus: () => void;
  onInputBlur: () => void;
};
export const useInputFocus = (): UseInputFocus => {
  const [focused, setFocused] = useState(false);
  const [cellStyle, setCellStyle] = useState<TasksListCellProps>();
  const { stickyStyle } = useTasksListContext();
  const onInputFocus = useCallback(() => {
    setCellStyle({
      borderColor: 'cyan.400',
      _hover: {
        bg: 'white',
      },
      containerStyle: {
        bg: 'white',
        zIndex: ((stickyStyle.zIndex as number) ?? 0) + 100,
        _hover: {
          zIndex: ((stickyStyle.zIndex as number) ?? 0) + 100,
        },
      },
    });
    setFocused(true);
  }, [stickyStyle.zIndex]);
  const onInputBlur = useCallback(() => {
    setCellStyle({});
    setFocused(false);
  }, []);

  return {
    inputFocused: focused,
    setInputFocused: setFocused,
    cellStyle,
    onInputFocus,
    onInputBlur,
  };
};
