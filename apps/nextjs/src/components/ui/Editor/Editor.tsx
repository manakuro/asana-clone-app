import { memo, type PropsWithChildren } from 'react';
import { plugins, schema } from '@/shared/prosemirror/config';
import { EditorContainer, type EditorContainerProps } from './Editors';

type Props = PropsWithChildren<{
  initialValue: string;
  onChange?: (val: string) => void;
  editable?: EditorContainerProps['editable'];
}>;

const pluginsProp = plugins();
export const Editor = memo(function Editor(props: Props) {
  return (
    <EditorContainer
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
