import {
  ProjectTeammateMenuItem,
  useProjectTeammateMenu,
} from '@/components/features/organisms/Menus/ProjectTeammateMenu';
import { SearchMenuLoading } from '@/components/features/organisms/Menus/SearchMenu';
import type { Teammate } from '@/store/entities/teammate';
import { memo } from 'react';

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
