import { memo } from 'react';
import { EditorPlaceholder } from 'src/components/ui/organisms/Editor';
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
