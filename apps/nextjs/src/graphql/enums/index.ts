export const ActivityTypeCode = {
  Task: 'TASK',
  Workspace: 'WORKSPACE'
} as const;

export type ActivityTypeCode = typeof ActivityTypeCode[keyof typeof ActivityTypeCode];
export const FileTypeCode = {
  Image: 'IMAGE',
  Pdf: 'PDF',
  Text: 'TEXT'
} as const;

export type FileTypeCode = typeof FileTypeCode[keyof typeof FileTypeCode];
export const TaskColumnType = {
  Assignee: 'ASSIGNEE',
  Custom: 'CUSTOM',
  DueDate: 'DUE_DATE',
  Priority: 'PRIORITY',
  Project: 'PROJECT',
  Projects: 'PROJECTS',
  Tags: 'TAGS',
  TaskName: 'TASK_NAME'
} as const;

export type TaskColumnType = typeof TaskColumnType[keyof typeof TaskColumnType];
export const TaskListCompletedStatusCode = {
  All: 'ALL',
  Completed: 'COMPLETED',
  Completed_1Week: 'COMPLETED_1_WEEK',
  Completed_2Weeks: 'COMPLETED_2_WEEKS',
  Completed_3Weeks: 'COMPLETED_3_WEEKS',
  CompletedToday: 'COMPLETED_TODAY',
  CompletedYesterday: 'COMPLETED_YESTERDAY',
  Incomplete: 'INCOMPLETE'
} as const;

export type TaskListCompletedStatusCode = typeof TaskListCompletedStatusCode[keyof typeof TaskListCompletedStatusCode];
export const TaskListSortStatusCode = {
  Alphabetical: 'ALPHABETICAL',
  Assignee: 'ASSIGNEE',
  CreationTime: 'CREATION_TIME',
  DueDate: 'DUE_DATE',
  Likes: 'LIKES',
  None: 'NONE',
  Priority: 'PRIORITY',
  Project: 'PROJECT'
} as const;

export type TaskListSortStatusCode = typeof TaskListSortStatusCode[keyof typeof TaskListSortStatusCode];
export const TaskPriorityType = {
  High: 'HIGH',
  Low: 'LOW',
  Medium: 'MEDIUM'
} as const;

export type TaskPriorityType = typeof TaskPriorityType[keyof typeof TaskPriorityType];
export const TeammateTaskTabStatusCode = {
  Board: 'BOARD',
  Calendar: 'CALENDAR',
  Files: 'FILES',
  List: 'LIST'
} as const;

export type TeammateTaskTabStatusCode = typeof TeammateTaskTabStatusCode[keyof typeof TeammateTaskTabStatusCode];
export const TestTodoStatus = {
  Completed: 'COMPLETED',
  InProgress: 'IN_PROGRESS'
} as const;

export type TestTodoStatus = typeof TestTodoStatus[keyof typeof TestTodoStatus];