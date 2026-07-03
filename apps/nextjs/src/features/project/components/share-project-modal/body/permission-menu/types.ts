export const PROJECT_PERMISSION_CAN_EDIT = 1 as const;
export const PROJECT_PERMISSION_CAN_COMMENT = 2 as const;

export type ProjectPermissionTypes =
  | typeof PROJECT_PERMISSION_CAN_EDIT
  | typeof PROJECT_PERMISSION_CAN_COMMENT;

export const PROJECT_ROLE_OWNER = 1 as const;

export type ProjectRoleTypes = typeof PROJECT_ROLE_OWNER;
