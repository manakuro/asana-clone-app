import { memo } from 'react';
import { EditorPlaceholder } from '@/components/ui/editor';
import { useDescriptionContext } from './Provider';

export const Placeholder = memo(function Placeholder() {
  const { focused } = useDescriptionContext();

  if (focused) return null;

  return (
    <EditorPlaceholder py={1} px={1} alignItems="flex-start">
      Write a workspace details...
    </EditorPlaceholder>
  );
});
