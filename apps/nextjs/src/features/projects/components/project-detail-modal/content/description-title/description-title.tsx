import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { useDescriptionTitle } from '@/features/projects/hooks/use-description-title';
import { Input } from './input';

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
