import type React from 'react';
import { memo, useCallback, useEffect } from 'react';
import { useSearchProjectsQuery } from 'src/components/features/organisms/Menus/ProjectMenu/useSearchProjectsQuery';
import {
  SearchMenuLeftContainer,
  SearchMenuListItem,
  SearchMenuLoading,
  SearchMenuRightContainer,
  useSearchMenu,
} from 'src/components/features/organisms/Menus/SearchMenu';
import { Divider, Icon, Text } from 'src/components/ui/atoms';
import { useFirstRender } from 'src/hooks';
import type { Project } from 'src/store/entities/project';
import { ProjectItem } from './ProjectItem';

type Props = {
  onSelect: (val: string) => void;
  queryText: string;
  onClose: () => void;
  onClosed?: () => void;
  immediate?: boolean;
};

export const Content: React.FC<Props> = memo<Props>((props) => {
  const { queryText, onSelect, onClose, onClosed, immediate } = props;
  const { refetch, projects, loading: loadingQuery } = useSearchProjectsQuery();
  const { firstRender } = useFirstRender();

  useEffect(() => {
    if (immediate && firstRender) refetch({ queryText: '' });
  }, [immediate, refetch, firstRender]);

  const handleDebounce = useCallback(
    async (val: string) => {
      await refetch({ queryText: val });
    },
    [refetch],
  );

  const handleSelect = useCallback(
    (val: string) => {
      onSelect(val);
      onClose();
      onClosed?.();
    },
    [onClose, onClosed, onSelect],
  );

  const handleSelectOnKey = useCallback(
    (item: Project) => {
      handleSelect(item.id);
    },
    [handleSelect],
  );

  const { loading } = useSearchMenu({
    items: projects,
    loadingQuery,
    queryText,
    onSelect: handleSelectOnKey,
    onDebounce: handleDebounce,
  });

  if (loading) return <SearchMenuLoading />;

  return (
    <>
      {projects.map((p, i) => (
        <ProjectItem key={p.id} onClick={handleSelect} project={p} index={i} />
      ))}
      <Divider />
      <SearchMenuListItem index={projects.length}>
        <SearchMenuLeftContainer>
          <Icon icon="plus" color="primary" />
        </SearchMenuLeftContainer>
        <SearchMenuRightContainer>
          <Text fontSize="sm" color="primary" fontWeight="medium">
            {`Create project for '${queryText}'`}
          </Text>
        </SearchMenuRightContainer>
      </SearchMenuListItem>
    </>
  );
});
Content.displayName = 'Content';
