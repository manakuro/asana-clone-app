import type { TeammateTaskSection } from './type';

export const DEFAULT_TITLE_NAME = 'Untitled Section';

// Check to see if the data has been persisted in database.
export const hasTeammateTaskSectionBeenPersisted = (
  teammateTaskSection: TeammateTaskSection,
): boolean => {
  return !!teammateTaskSection.createdAt;
};
