import type { EditorState } from 'prosemirror-state';
import { type EditorProps, EditorView } from 'prosemirror-view';
import type { Dispatch, FC, SetStateAction } from 'react';
import { createReactNodeView } from '../ReactNodeView';
import type { PortalHandlers } from '../ReactNodeViewPortals';
import { Emoji } from './Emoji';
import { Link } from './Link';
import { Mention } from './Mention';

export const generateView = (props: {
  state: EditorState;
  createPortal: PortalHandlers['createPortal'];
  removePortal: PortalHandlers['removePortal'];
  setState: Dispatch<SetStateAction<EditorState>>;
  editable: EditorProps['editable'];
}) => {
  const view = new EditorView(null, {
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
        });
      },
      mention(node, view, getPos, decorations) {
        return createReactNodeView({
          node,
          view,
          getPos,
          decorations,
          component: Mention as FC,
          onCreatePortal: props.createPortal,
          onRemovePortal: props.removePortal,
        });
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
        });
      },
    },
    dispatchTransaction(tr) {
      const state = view.state.apply(tr);
      view.updateState(state);
      props.setState(state);
    },
  });
  return view;
};
