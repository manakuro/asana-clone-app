import { memo, useMemo } from 'react';
import {
  ProjectTeammateMenuItem,
  useProjectTeammateMenu,
} from '@/components/features/Menus/ProjectTeammateMenu';
import {
  SearchMenuLeftContainer,
  SearchMenuListItem,
  SearchMenuLoading,
  SearchMenuRightContainer,
} from '@/components/features/Menus/SearchMenu';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import type { Teammate } from '@/store/entities/teammate';

type Props = {
  onSelect: (val: Teammate) => void;
  queryText: string;
  onClose: () => void;
  onClosed?: () => void;
};

export const Content = memo(function Content(props: Props) {
  const { teammates, loading, onSelectTeammate } =
    useProjectTeammateMenu(props);

  const text = useMemo(() => {
    if (props.queryText) return `Invite '${props.queryText}' via email`;

    return 'Invite teammates via email';
  }, [props.queryText]);

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
      <Separator />
      <SearchMenuListItem index={teammates.length}>
        <SearchMenuLeftContainer>
          <Icon icon="plus" color="primary" />
        </SearchMenuLeftContainer>
        <SearchMenuRightContainer>
          <Text fontSize="sm" color="primary" fontWeight="medium">
            {text}
          </Text>
        </SearchMenuRightContainer>
      </SearchMenuListItem>
    </>
  );
});
