import { EditorPlaceholder } from '@/components/ui/Editor';
import { memo } from 'react';
import { useDescriptionContext } from './Provider';

export const Placeholder = memo(function Placeholder() {
  const { focused } = useDescriptionContext();

  if (focused) return null;

  return (
    <EditorPlaceholder alignItems="flex-start">
      Write project details...
    </EditorPlaceholder>
  );
});
