import { memo } from 'react';
import { SearchMenuLoading } from '@/components/ui/search-menu';
import {
  ProjectTeammateMenuItem,
  useProjectTeammateMenu,
} from '@/features/project/components/project-teammate-menu';
import type { Teammate } from '@/features/teammate/store/teammate';

type Props = {
  onSelect: (val: Teammate) => void;
  queryText: string;
  onClose: () => void;
  onClosed?: () => void;
};

export const Content = memo(function Content(props: Props) {
  const { teammates, loading, onSelectTeammate } =
    useProjectTeammateMenu(props);

  if (loading) return <SearchMenuLoading />;

  return (
    <>
      {teammates.map((t, i) => (
        <ProjectTeammateMenuItem
          key={t.id}
          onClick={onSelectTeammate}
          teammate={t}
          index={i}
        />
      ))}
    </>
  );
});
