import { memo } from 'react';
import { WrapItem } from '@/components/ui/wrap';
import { TeammateAvatar } from '@/features/teammate/components/teammate-avatar';

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
