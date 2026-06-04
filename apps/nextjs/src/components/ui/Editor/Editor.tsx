import { memo, type PropsWithChildren, useMemo } from 'react';
import { plugins, schema } from '@/shared/prosemirror/config';
import { EditorContainer, type EditorContainerProps } from './Editors';

type Props = PropsWithChildren<{
  initialValue: string;
  forceUpdate?: number;
  onChange?: (val: string) => void;
  resetView?: number;
  editable?: EditorContainerProps['editable'];
}>;

export const Editor = memo(function Editor(props: Props) {
  const pluginsProp = useMemo(() => plugins(), []);

  return (
    <EditorContainer
      onChange={props.onChange}
      debounce={500}
      schema={schema}
      plugins={pluginsProp}
      initialValue={props.initialValue}
      editable={props.editable}
      resetView={props.resetView}
    >
      {props.children}
    </EditorContainer>
  );
});
