import { Node as ProsemirrorNode } from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'
import { EditorProps, EditorView } from 'prosemirror-view'
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { createReactNodeView } from './ReactNodeView'
import {
  PortalHandlers,
  ReactNodeViewPortalsProvider,
  useReactNodeViewCreatePortal,
} from './ReactNodeViewPortals'
import { Link, Mention, Emoji } from './nodeViews'

const EditorStateContext = createContext<EditorState | null>(null)
const EditorViewContext = createContext<EditorView | null>(null)

export const useEditorStateContext = (): EditorState => {
  const context = useContext(EditorStateContext)
  if (!context)
    throw new Error('useEditorState is only available inside EditorProvider')
  return context
}

export const useEditorViewContext = () => useContext(EditorViewContext)

type Props = {
  doc?: ProsemirrorNode
  plugins?: Plugin[]
  forceUpdate?: number
  resetView?: number
} & EditorProps
export const EditorProvider: React.FCWithChildren<Props> = (props) => {
  return (
    <ReactNodeViewPortalsProvider>
      <Provider {...props} />
    </ReactNodeViewPortalsProvider>
  )
}

const generateState = (props: Parameters<typeof EditorState.create>[0]) => {
  return EditorState.create({
    doc: props.doc,
    plugins: props.plugins,
  })
}
const generateView = (
  props: Props & {
    state: EditorState
    createPortal: PortalHandlers['createPortal']
    removePortal: PortalHandlers['removePortal']
    setState: Dispatch<SetStateAction<EditorState>>
  },
) => {
  const view = new EditorView(undefined, {
    state: props.state,
    editable: props.editable,
    nodeViews: {
      link(node, view, getPos, decorations) {
        return createReactNodeView({
          node,
          view,
          getPos,
          decorations,
          component: Link,
          onCreatePortal: props.createPortal,
          onRemovePortal: props.removePortal,
        })
      },
      mention(node, view, getPos, decorations) {
        return createReactNodeView({
          node,
          view,
          getPos,
          decorations,
          component: Mention,
          onCreatePortal: props.createPortal,
          onRemovePortal: props.removePortal,
        })
      },
      emoji(node, view, getPos, decorations) {
        return createReactNodeView({
          node,
          view,
          getPos,
          decorations,
          component: Emoji,
          onCreatePortal: props.createPortal,
          onRemovePortal: props.removePortal,
        })
      },
    },
    dispatchTransaction(tr) {
      const state = view.state.apply(tr)
      view.updateState(state)
      props.setState(state)
    },
  })
  return view
}

const Provider: React.FCWithChildren<Props> = (props) => {
  const { createPortal, removePortal } = useReactNodeViewCreatePortal()
  const [state, setState] = useState(generateState(props))
  const [view, setView] = useState<EditorView | null>(null)
  //
  // useEffect(() => {
  //   if (!view) return
  //   if (!props.forceUpdate) return
  //   if (props.forceUpdate === 2) return
  //
  //   // const newState = generateState({
  //   //   doc: props.doc,
  //   //   plugins: view.state.plugins,
  //   //   selection: view.state.selection,
  //   //   storedMarks: view.state.storedMarks,
  //   // })
  //   // view.state.tr.replace(
  //   //   0,
  //   //   view.state.doc.content.size,
  //   //   new Slice<any>(props.doc?.content!, 0, 0),
  //   // )
  //   // setState(newState)
  //   // view.updateState(newState)
  //
  //   if (!view.state.doc.content.size) return
  //   console.log('forceUpdate!')
  //
  //   const tr = view.state.tr.replaceWith(
  //     0,
  //     view.state.doc.content.size,
  //     props.doc?.content!,
  //   )
  //   view.dispatch(
  //     tr.setSelection(
  //       TextSelection.create(
  //         tr.doc,
  //         view.state.selection.anchor,
  //         view.state.selection.head,
  //       ),
  //     ),
  //   )
  // }, [props.forceUpdate])

  const resetView = useCallback(() => {
    setView(
      generateView({
        ...props,
        state: generateState({
          doc: props.doc,
          plugins: props.plugins,
        }),
        setState,
        createPortal,
        removePortal,
      }),
    )
  }, [props])

  useEffect(() => {
    resetView()
    /* eslint react-hooks/exhaustive-deps: off */
  }, [props.editable])

  useEffect(() => {
    resetView()
    /* eslint react-hooks/exhaustive-deps: off */
  }, [props.resetView])

  return (
    <EditorStateContext.Provider value={state}>
      <EditorViewContext.Provider value={view}>
        {props.children}
      </EditorViewContext.Provider>
    </EditorStateContext.Provider>
  )
}
