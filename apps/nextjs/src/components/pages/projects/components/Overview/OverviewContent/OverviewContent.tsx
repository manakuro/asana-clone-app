import { memo } from 'react';
import { DescriptionSection } from './DescriptionSection';
import { KeyResourcesSection } from './KeyResourcesSection';
import { ProjectRolesSection } from './ProjectRolesSection';

export const OverviewContent = memo(function OverviewContent() {
  return (
    <>
      <DescriptionSection />
      <ProjectRolesSection />
      <KeyResourcesSection />
    </>
  );
});
