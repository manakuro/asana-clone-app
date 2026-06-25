import type { ProjectTaskSection } from './type';

export const DEFAULT_TITLE_NAME = 'Untitled Section';

// Check to see if the data has been persisted in database.
export const hasProjectTaskSectionBeenPersisted = (
  projectTaskSection: ProjectTaskSection,
): boolean => {
  return !!projectTaskSection.createdAt;
};
