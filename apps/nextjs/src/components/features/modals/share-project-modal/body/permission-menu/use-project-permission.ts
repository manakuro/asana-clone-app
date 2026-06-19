import { useState } from 'react';
import type { ProjectPermissionTypes } from './types';

export const useProjectPermission = () => {
  const [status, setStatus] = useState<ProjectPermissionTypes>(1);

  return {
    status,
    setStatus,
  };
};
