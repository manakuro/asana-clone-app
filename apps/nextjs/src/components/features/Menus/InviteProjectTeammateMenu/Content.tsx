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
import { Divider } from '@/components/ui/Divider';
import { Icon } from '@/components/ui/Icon';
import type { PopoverProps } from '@/components/ui/Popover';
import { Text } from '@/components/ui/Text';
import type { Teammate } from '@/store/entities/teammate';
import { memo } from 'react';

type Props = PopoverProps & {
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
    </>
  );
});
