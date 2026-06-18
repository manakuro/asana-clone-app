import { memo } from 'react';
import { TeammateAvatar } from '@/components/features/TeammateAvatar';
import { WrapItem } from '@/components/ui/wrap';

type Props = {
  teammateId: string;
};

export const Teammate = memo(function Teammate(props: Props) {
  return (
    <WrapItem>
      <TeammateAvatar teammateId={props.teammateId} size="xs" />
    </WrapItem>
  );
});
