import type { Node as ProsemirrorNode } from 'prosemirror-model';
import { EditorState, type Plugin } from 'prosemirror-state';
import type { EditorProps, EditorView } from 'prosemirror-view';
import type { PropsWithChildren } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { generateView } from './nodeViews/generateView';
import {
  ReactNodeViewPortalsProvider,
  useReactNodeViewCreatePortal,
} from './ReactNodeViewPortals';

const EditorStateContext = createContext<EditorState | null>(null);
const EditorViewContext = createContext<EditorView | null>(null);

export const useEditorStateContext = (): EditorState => {
  const context = useContext(EditorStateContext);
  if (!context)
    throw new Error('useEditorState is only available inside EditorProvider');
  return context;
};

export const useEditorViewContext = () => useContext(EditorViewContext);

type Props = {
  doc?: ProsemirrorNode;
  plugins?: Plugin[];
  forceUpdate?: number;
  resetView?: number;
} & EditorProps;
export function EditorProvider(props: PropsWithChildren<Props>) {
  return (
    <ReactNodeViewPortalsProvider>
      <Provider {...props} />
    </ReactNodeViewPortalsProvider>
  );
}

const generateState = (props: Parameters<typeof EditorState.create>[0]) => {
  return EditorState.create({
    doc: props.doc,
    plugins: props.plugins,
  });
};

function Provider(props: PropsWithChildren<Props>) {
  const { createPortal, removePortal } = useReactNodeViewCreatePortal();
  const [state, setState] = useState(
    generateState({
      doc: props.doc,
      plugins: props.plugins,
    }),
  );
  const [view, setView] = useState<EditorView | null>(null);

  const resetView = useCallback(() => {
    setView(
      generateView({
        state: generateState({
          doc: props.doc,
          plugins: props.plugins,
        }),
        setState,
        createPortal,
        removePortal,
        editable: props.editable,
      }),
    );
  }, [props.doc, props.plugins, props.editable, createPortal, removePortal]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Avoid unnecessary rendering.
  useEffect(() => {
    resetView();
    /* eslint react-hooks/exhaustive-deps: off */
  }, [props.editable]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Avoid unnecessary rendering.
  useEffect(() => {
    resetView();
    /* eslint react-hooks/exhaustive-deps: off */
  }, [props.resetView]);

  return (
    <EditorStateContext.Provider value={state}>
      <EditorViewContext.Provider value={view}>
        {props.children}
      </EditorViewContext.Provider>
    </EditorStateContext.Provider>
  );
}
