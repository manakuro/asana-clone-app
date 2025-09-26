import { useCallback } from 'react';

const ID = 'tasksListBody';
export const useTasksListBody = () => {
  const getTasksListBodyElement = useCallback(() => {
    return document.getElementById(ID);
  }, []);

  return {
    id: ID,
    getTasksListBodyElement,
  };
};
