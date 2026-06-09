import type { Node as ProsemirrorNode } from 'prosemirror-model';
import { EditorState, type Plugin } from 'prosemirror-state';
import type { EditorProps, EditorView } from 'prosemirror-view';
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useRef,
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
  const { createPortal, removePortal, setPortals } =
    useReactNodeViewCreatePortal();
  const [state, setState] = useState(
    generateState({ doc: props.doc, plugins: props.plugins }),
  );
  const [view, setView] = useState<EditorView | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Avoid unnecessary rendering.
  useEffect(() => {
    if (!editorRef.current) return;

    const newView = generateView({
      place: editorRef.current,
      state,
      setState,
      createPortal,
      removePortal,
      editable: props.editable,
    });
    viewRef.current = newView;
    setView(newView);

    return () => {
      setPortals([]);
      viewRef.current?.destroy();
      viewRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!viewRef.current) return;
    viewRef.current.setProps({ editable: props.editable });
  }, [props.editable]);

  return (
    <EditorStateContext.Provider value={state}>
      <EditorViewContext.Provider value={view}>
        {props.children}
      </EditorViewContext.Provider>
    </EditorStateContext.Provider>
  );
}
