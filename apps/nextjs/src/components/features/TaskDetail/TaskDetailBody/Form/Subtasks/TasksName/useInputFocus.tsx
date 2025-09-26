import type { TasksListCellProps } from '@/components/features/Tasks/TasksList/TasksListCell';
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from 'react';

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
  const onInputFocus = useCallback(() => {
    setCellStyle({
      borderColor: 'primary',
      _hover: {
        bg: 'white',
      },
      containerStyle: {
        bg: 'white',
      },
    });
    setFocused(true);
  }, []);
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
