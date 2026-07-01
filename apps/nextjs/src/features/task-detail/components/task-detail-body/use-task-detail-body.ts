import { useTaskDetailBodyRef } from './use-task-detail-body-ref';

export const useTaskDetailBody = () => {
  const { taskDetailBodyDom } = useTaskDetailBodyRef();

  return {
    taskDetailBodyDom,
  };
};
