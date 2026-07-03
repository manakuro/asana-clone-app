import type { EditorState, Transaction } from 'prosemirror-state';
import type { EditorView } from 'prosemirror-view';

export type ToolbarItem = {
  action: (
    state: EditorState,
    dispatch: (tr: Transaction) => void,
    view: EditorView,
  ) => boolean | Promise<boolean>;
  isActive?: (state: EditorState) => boolean;
  isEnable?: (state: EditorState) => boolean;
};
