import {
  ProjectTeammateMenuItem,
  useProjectTeammateMenu,
} from '@/components/features/organisms/Menus/ProjectTeammateMenu';
import {
  SearchMenuLeftContainer,
  SearchMenuListItem,
  SearchMenuLoading,
  SearchMenuRightContainer,
} from '@/components/features/organisms/Menus/SearchMenu';
import { Divider, Icon, Text } from '@/components/ui/atoms';
import type { Teammate } from '@/store/entities/teammate';
import { memo } from 'react';

type Props = {
  onSelect: (val: Teammate) => void;
  queryText: string;
  onClose: () => void;
  onClosed?: () => void;
};

export const Content = memo(function Content(props: Props) {
  const { teammates, loading, onSelectTeammate } = useProjectTeammateMenu({
    ...props,
    additionalIndexLength: 1,
  });

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
      <Divider />
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
      <Divider />
      <SearchMenuListItem index={teammates.length + 1}>
        <SearchMenuLeftContainer>
          <Icon icon="plus" color="primary" />
        </SearchMenuLeftContainer>
        <SearchMenuRightContainer>
          <Text fontSize="sm" color="primary" fontWeight="medium">
            Assign duplicate tasks
          </Text>
        </SearchMenuRightContainer>
      </SearchMenuListItem>
    </>
  );
});
