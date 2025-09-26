import { EditorPlaceholder } from '@/components/ui/Editor';
import { memo } from 'react';
import { useInputContext } from './Provider';

export const Placeholder = memo(function Placeholder() {
  const { focused, hasTaskFile } = useInputContext();

  if (focused) return null;
  if (hasTaskFile) return null;

  return (
    <EditorPlaceholder ml={2}>
      Ask a question or post an update...
    </EditorPlaceholder>
  );
});
