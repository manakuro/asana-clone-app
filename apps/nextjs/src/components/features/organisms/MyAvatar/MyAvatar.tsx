import { PopoverProfile } from '@/components/features/organisms/Popovers';
import { Avatar, type AvatarProps } from '@/components/ui/atoms';
import { useMe } from '@/store/entities/me';
import { memo } from 'react';

type Props = AvatarProps;

export const MyAvatar = memo(function MyAvatar(props: Props) {
  const { me } = useMe();

  return (
    <PopoverProfile
      profile={{
        name: me.name,
        image: me.image,
        email: me.email,
      }}
    >
      <Avatar
        name={me.name}
        src={me.image}
        cursor="pointer"
        bg="teal.200"
        {...props}
      />
    </PopoverProfile>
  );
});
