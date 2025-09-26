import { isHTMLElement } from '@/shared/isHTMLElement';
import { useCallback } from 'react';
import { useTasksBoardListItemElement } from '../TasksBoardListItem';

const CLASS = 'tasks-board-list-section';
export const useTasksBoardListSectionElement = () => {
  const { getTasksBoardListItemElementById } = useTasksBoardListItemElement();

  const getTasksBoardListSectionElementByTaskId = useCallback(
    (taskId: string) => {
      const taskBoardListItem = getTasksBoardListItemElementById(taskId);
      if (!isHTMLElement(taskBoardListItem)) return;
      return taskBoardListItem.closest(`.${CLASS}`);
    },
    [getTasksBoardListItemElementById],
  );

  return {
    className: CLASS,
    getTasksBoardListSectionElementByTaskId,
  };
};
