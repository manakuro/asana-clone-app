import { memo } from 'react';
import { DescriptionSection } from './description-section';
import { KeyResourcesSection } from './key-resources-section';
import { ProjectRolesSection } from './project-roles-section';

export const OverviewContent = memo(function OverviewContent() {
  return (
    <>
      <DescriptionSection />
      <ProjectRolesSection />
      <KeyResourcesSection />
    </>
  );
});
