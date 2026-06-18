import { memo, useCallback } from 'react';
import { TeammateAvatar } from '@/components/features/TeammateAvatar';
import type { FlexProps } from '@/components/ui/flex';
import { Text } from '@/components/ui/text';
import { useTeammate } from '@/store/entities/teammate';
import { LeftContainer, ListItem, RightContainer } from '../ListItem';

type Props = Override<
  FlexProps,
  {
    onClick: (val: any) => void;
  }
> & {
  assignee: any;
  index: number;
};

export const AssigneeItem = memo(function AssigneeItem(props: Props) {
  const handleClick = useCallback(() => {
    props.onClick(props.assignee);
  }, [props]);
  const { teammate } = useTeammate('1');

  return (
    <ListItem index={props.index} onClick={handleClick}>
      <LeftContainer>
        <TeammateAvatar teammateId={teammate.id} size="xs" />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm">mana</Text>
        <Text ml={5} fontSize="xs" color="fg.muted">
          {teammate.email}
        </Text>
      </RightContainer>
    </ListItem>
  );
});
