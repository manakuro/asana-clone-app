import { memo } from 'react';
import { TeammateAvatar } from '@/features/teammates/components/teammate-avatar';

type Props = {
  teammateId: string;
};

export const Teammate = memo(function Teammate(props: Props) {
  return <TeammateAvatar teammateId={props.teammateId} size="xs" />;
});
