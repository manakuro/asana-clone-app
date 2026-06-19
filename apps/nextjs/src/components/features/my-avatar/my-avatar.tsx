import { memo } from 'react';
import { PopoverProfile } from '@/components/features/Popovers';
import { Avatar, type AvatarProps } from '@/components/ui/avatar';
import { useMe } from '@/store/entities/me';

type Props = AvatarProps & {
  showProfile?: boolean;
};

export const MyAvatar = memo(function MyAvatar(props: Props) {
  const { me } = useMe();
  const { showProfile, ...rest } = props;

  if (!me.id) {
    return <Avatar {...rest} />;
  }

  if (showProfile ?? true) {
    return (
      <PopoverProfile
        profile={{
          name: me.name,
          image: me.image,
          email: me.email,
        }}
      >
        <Avatar name={me.name} src={me.image} cursor="pointer" {...rest} />
      </PopoverProfile>
    );
  }

  return <Avatar name={me.name} src={me.image} cursor="pointer" {...rest} />;
});
