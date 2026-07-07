import { useCallback } from 'react';
import { ActivityTypeCode, type ActivityTypeCodeValues } from '../types';

export const useActivityType = () => {
  const isTaskType = useCallback(
    (type: ActivityTypeCodeValues) => type === ActivityTypeCode.Task,
    [],
  );

  const isWorkspaceType = useCallback(
    (type: ActivityTypeCodeValues) => type === ActivityTypeCode.Workspace,
    [],
  );

  return {
    isTaskType,
    isWorkspaceType,
  };
};
