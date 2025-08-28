import { Flex } from '@/components/ui/atoms';
import { useDescriptionTitle } from '@/hooks/pages/projects';
import { memo } from 'react';
import { Input } from './Input';

type Props = {
  projectId: string;
};

export const DescriptionTitle = memo(function DescriptionTitle(props: Props) {
  const { descriptionTitle, onChange } = useDescriptionTitle(props);

  return (
    <Flex>
      <Input value={descriptionTitle} onChange={onChange} />
    </Flex>
  );
});
