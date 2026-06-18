import type { Node as ProsemirrorNode, Schema } from 'prosemirror-model';
import type { Plugin } from 'prosemirror-state';
import type { EditorProps } from 'prosemirror-view';
import { type PropsWithChildren, type Ref, useMemo } from 'react';
import { ClientOnly } from '@/components/ui/client-only';
import { useDebounce, usePrevious } from '@/hooks';
import {
  createJSONTransformer,
  type ProsemirrorTransformer,
} from '@/shared/prosemirror/transformers';
import {
  type EditorHandle,
  EditorProvider,
  useEditorStateContext,
} from './editor-provider';
import { Portals } from './portals';

export type EditorContainerProps = {
  schema: Schema;
  plugins: Plugin[];
  initialValue: string;
  onChange?: (value: string) => void;
  debounce: number;
  editable?: EditorProps['editable'];
  ref?: Ref<EditorHandle>;
};

type Props = PropsWithChildren<EditorContainerProps>;

export function EditorContainer({
  ref,
  schema,
  plugins,
  initialValue,
  onChange,
  debounce,
  editable,
  children,
}: Props) {
  const transformer = useMemo<ProsemirrorTransformer<string>>(
    () => createJSONTransformer(schema),
    [schema],
  );
  const initialDoc = useMemo<ProsemirrorNode>(
    () => transformer.parse(initialValue),
    [initialValue, transformer],
  );

  return (
    <ClientOnly>
      <EditorProvider
        ref={ref}
        plugins={plugins}
        doc={initialDoc}
        editable={editable}
      >
        <Container
          transformer={transformer}
          debounce={debounce}
          onChange={onChange}
          initialValue={initialValue}
        >
          {children}
        </Container>
        <Portals />
      </EditorProvider>
    </ClientOnly>
  );
}

type ContainerProps<P> = {
  onChange?: (value: P) => void;
  transformer: ProsemirrorTransformer<P>;
  debounce: number;
  initialValue: string;
};
export function Container<P>({
  onChange,
  transformer,
  children,
  debounce,
}: PropsWithChildren<ContainerProps<P>>) {
  const state = useEditorStateContext();
  const prevStateDoc = usePrevious<ProsemirrorNode>(state.doc);

  useDebounce(
    state.doc,
    (val) => {
      const serializedValue = transformer.serialize(val);
      if (
        prevStateDoc &&
        serializedValue === transformer.serialize(prevStateDoc)
      )
        return;
      onChange?.(serializedValue);
    },
    debounce,
  );

  return <>{children}</>;
}
