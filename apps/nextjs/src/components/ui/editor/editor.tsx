import { memo, type PropsWithChildren, type Ref, useMemo } from 'react';
import { plugins, schema } from '@/shared/prosemirror/config';
import { EditorContainer, type EditorContainerProps } from './editors';
import type { EditorHandle } from './editors/editor-provider';

export type { EditorHandle };

type Props = PropsWithChildren<{
  initialValue: string;
  onChange?: (val: string) => void;
  editable?: EditorContainerProps['editable'];
  ref?: Ref<EditorHandle>;
}>;

export const Editor = memo(function Editor({ ref, ...props }: Props) {
  const pluginsProp = useMemo(() => plugins(), []);

  return (
    <EditorContainer
      ref={ref}
      onChange={props.onChange}
      debounce={500}
      schema={schema}
      plugins={pluginsProp}
      initialValue={props.initialValue}
      editable={props.editable}
    >
      {props.children}
    </EditorContainer>
  );
});
