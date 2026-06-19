import { PopoverProfile } from '@/components/features/Popovers';
import { Avatar, type AvatarProps } from '@/components/ui/avatar';
import { useTeammate } from '@/store/entities/teammate';

type Props = {
  teammateId: string;
  showProfile?: boolean;
} & AvatarProps;

export function TeammateAvatar(props: Props) {
  const { teammateId, showProfile, ...rest } = props;
  const { teammate } = useTeammate(teammateId);

  if (!teammateId) {
    return <Avatar {...rest} />;
  }

  if (!(showProfile ?? true)) {
    return (
      <Avatar
        name={teammate.name}
        src={teammate.image}
        colorPalette="teal"
        {...rest}
      />
    );
  }

  return (
    <PopoverProfile
      profile={{
        name: teammate.name,
        image: teammate.image,
        email: teammate.email,
      }}
    >
      <Avatar
        name={teammate.name}
        src={teammate.image}
        colorPalette="teal"
        {...rest}
      />
    </PopoverProfile>
  );
}
