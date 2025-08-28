import { TeammateAvatar } from '@/components/features/organisms/TeammateAvatar';
import { WrapItem } from '@/components/ui/atoms';
import { memo } from 'react';

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
