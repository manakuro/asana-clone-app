import { useTaskDetailBodyRef } from './useTaskDetailBodyRef';

export const useTaskDetailBody = () => {
  const { taskDetailBodyDom } = useTaskDetailBodyRef();

  return {
    taskDetailBodyDom,
  };
};
