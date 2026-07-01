import { useCallback } from 'react';

const CLASS = 'tasks-board-list-item';
export const useTasksBoardListItemElement = () => {
  const getTasksBoardListItemElements = useCallback(() => {
    return Array.from(document.querySelectorAll(`.${CLASS}`));
  }, []);

  const generateId = useCallback((taskId: string) => `${taskId}-${CLASS}`, []);

  const getTasksBoardListItemElementById = useCallback(
    (taskId: string) => {
      return document.getElementById(generateId(taskId));
    },
    [generateId],
  );

  return {
    className: CLASS,
    generateId,
    getTasksBoardListItemElements,
    getTasksBoardListItemElementById,
  };
};
