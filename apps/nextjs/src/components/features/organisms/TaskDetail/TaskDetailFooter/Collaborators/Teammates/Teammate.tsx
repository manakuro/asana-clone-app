import { TeammateAvatar } from '@/components/features/organisms/TeammateAvatar';
import { memo } from 'react';

type Props = {
  teammateId: string;
};

export const Teammate = memo(function Teammate(props: Props) {
  return <TeammateAvatar teammateId={props.teammateId} size="xs" />;
});
