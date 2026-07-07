import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import {
  SearchMenuLeftContainer,
  SearchMenuListItem,
  SearchMenuLoading,
  SearchMenuRightContainer,
} from '@/components/ui/search-menu';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
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
      <Separator />
      <SearchMenuListItem index={teammates.length}>
        <SearchMenuLeftContainer>
          <Icon icon="userPlus" color="primary" />
        </SearchMenuLeftContainer>
        <SearchMenuRightContainer>
          <Text fontSize="sm" color="primary" fontWeight="medium">
            {`Invite '${props.queryText}' via email`}
          </Text>
        </SearchMenuRightContainer>
      </SearchMenuListItem>
    </>
  );
});
