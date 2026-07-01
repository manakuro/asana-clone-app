import { memo } from 'react';
import { useDescriptionTitle } from '@/components/features/projects/hooks/use-description-title';
import { Flex } from '@/components/ui/flex';
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
