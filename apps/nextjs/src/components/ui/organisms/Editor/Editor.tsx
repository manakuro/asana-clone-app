import { plugins, schema } from '@/shared/prosemirror/config';
import type { EditorProps } from 'prosemirror-view';
import { type PropsWithChildren, memo, useMemo } from 'react';
import { EditorContainer } from './Editors';

type Props = PropsWithChildren<
  {
    initialValue: string;
    forceUpdate?: number;
    onChange?: (val: string) => void;
    resetView?: number;
  } & EditorProps
>;

export const Editor = memo(function Editor(props: Props) {
  const pluginsProp = useMemo(() => plugins(), []);

  return (
    <EditorContainer
      onChange={props.onChange}
      {...props}
      debounce={500}
      schema={schema}
      plugins={pluginsProp}
      initialValue={props.initialValue}
    >
      {props.children}
    </EditorContainer>
  );
});
