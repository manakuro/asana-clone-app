import type { Node as ProsemirrorNode } from 'prosemirror-model';
import { EditorState, type Plugin } from 'prosemirror-state';
import type { EditorProps, EditorView } from 'prosemirror-view';
import {
  createContext,
  type PropsWithChildren,
  type Ref,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { generateView } from './node-views/generate-view';
import {
  ReactNodeViewPortalsProvider,
  useReactNodeViewCreatePortal,
} from './react-node-view-portals';

const EditorStateContext = createContext<EditorState | null>(null);
const EditorViewContext = createContext<EditorView | null>(null);

export const useEditorStateContext = (): EditorState => {
  const context = useContext(EditorStateContext);
  if (!context)
    throw new Error('useEditorState is only available inside EditorProvider');
  return context;
};

export const useEditorViewContext = () => useContext(EditorViewContext);

export type EditorHandle = {
  setEditable: (editable: () => boolean) => void;
};

type Props = {
  doc?: ProsemirrorNode;
  plugins?: Plugin[];
  ref?: Ref<EditorHandle>;
} & EditorProps;

export function EditorProvider({ ref, ...props }: PropsWithChildren<Props>) {
  return (
    <ReactNodeViewPortalsProvider>
      <Provider ref={ref} {...props} />
    </ReactNodeViewPortalsProvider>
  );
}

const generateState = (props: Parameters<typeof EditorState.create>[0]) => {
  return EditorState.create({
    doc: props.doc,
    plugins: props.plugins,
  });
};

function Provider({ ref, ...props }: PropsWithChildren<Props>) {
  const { createPortal, removePortal, setPortals } =
    useReactNodeViewCreatePortal();
  const [state, setState] = useState(
    generateState({ doc: props.doc, plugins: props.plugins }),
  );
  const [view, setView] = useState<EditorView | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      setEditable: (editable: () => boolean) => {
        viewRef.current?.setProps({ editable });
      },
    }),
    [],
  );

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

  return (
    <EditorStateContext.Provider value={state}>
      <EditorViewContext.Provider value={view}>
        <div ref={editorRef} />
        {props.children}
      </EditorViewContext.Provider>
    </EditorStateContext.Provider>
  );
}
