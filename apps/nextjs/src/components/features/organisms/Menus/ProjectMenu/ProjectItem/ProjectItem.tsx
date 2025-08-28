import { SearchMenuListItem } from '@/components/features/organisms/Menus/SearchMenu';
import type { Project } from '@/store/entities/project';
import type React from 'react';
import { memo, useCallback } from 'react';

type Props = {
  onClick: (project: string) => void;
  project: Project;
  index: number;
};

export const ProjectItem = memo(function ProjectItem(props: Props) {
  const { project } = props;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      props.onClick(project.id);
    },
    [project.id, props],
  );

  return (
    <SearchMenuListItem index={props.index} onClick={handleClick}>
      {project.name}
    </SearchMenuListItem>
  );
});
