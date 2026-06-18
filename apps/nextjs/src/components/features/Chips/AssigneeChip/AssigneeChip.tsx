import type React from 'react';
import { memo, useCallback } from 'react';
import { PopoverProfile } from '@/components/features/Popovers';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useClickableHoverStyle } from '@/hooks';
import { useTeammate } from '@/store/entities/teammate';

type Props = {
  teammateId: string;
  onDelete?: (teammateId: string) => void;
};

export const AssigneeChip = memo(function AssigneeChip(props: Props) {
  const { teammateId, onDelete } = props;
  const { teammate } = useTeammate(teammateId);
  const { clickableHoverLightStyle } = useClickableHoverStyle();

  const handleDelete = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      onDelete?.(teammateId);
    },
    [onDelete, teammateId],
  );

  return (
    <PopoverProfile
      profile={{
        name: teammate.name,
        image: teammate.image,
        email: teammate.email,
      }}
    >
      <Button
        size="xs"
        border="1px"
        borderColor="transparent"
        cursor="pointer"
        borderRadius="full"
        variant="subtle"
      >
        <Avatar
          name={teammate.name}
          src={teammate.image}
          size="xs"
          cursor="pointer"
          bg="teal.200"
        />
        <Text ml={2} fontSize="sm">
          {teammate.name}
        </Text>
        <Icon
          ml={2}
          mt="1px"
          icon="x"
          color="fg.muted"
          size="sm"
          {...clickableHoverLightStyle}
          onClick={handleDelete}
        />
      </Button>
    </PopoverProfile>
  );
});
