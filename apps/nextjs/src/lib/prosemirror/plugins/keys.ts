import {
  baseKeymap,
  chainCommands,
  exitCode,
  joinDown,
  joinUp,
  lift,
} from 'prosemirror-commands';
import { redo, undo } from 'prosemirror-history';
import { undoInputRule } from 'prosemirror-inputrules';
import { keymap } from 'prosemirror-keymap';
import type { Plugin } from 'prosemirror-state';

import {
  insertNodeHorizontalRule,
  insertNodeLineBreak,
  liftListItemCommand,
  setListTypeBullet,
  setListTypeOrdered,
  sinkListItemCommand,
  splitListItemCommand,
  toggleMarkBold,
  toggleMarkCode,
  toggleMarkItalic,
  toggleMarkStrikethrough,
  toggleMarkUnderline,
  wrapInBlockquote,
} from '../config/commands';
import { ArrowDown, ArrowUp, Enter, Escape } from '../plugins/suggestions/keys';

export const listKeys = (): Plugin =>
  keymap({
    'Mod-]': sinkListItemCommand,
    'Mod-[': liftListItemCommand,
    Tab: sinkListItemCommand,
    'Shift-Tab': liftListItemCommand,
    Enter: splitListItemCommand,
  });

export const editorKeys = (): Plugin =>
  keymap({
    'Mod-z': undo,
    'Shift-Mod-z': redo,
    Backspace: undoInputRule,
    'Mod-y': redo,
    'Alt-ArrowUp': joinUp,
    'Alt-ArrowDown': joinDown,
    'Mod-BracketLeft': lift,
    Escape,
    Enter,
    ArrowUp,
    ArrowDown,
    'Shift-Mod-8': setListTypeBullet,
    'Shift-Mod-7': setListTypeOrdered,
    'Mod-b': toggleMarkBold,
    'Mod-i': toggleMarkItalic,
    'Ctrl-`': toggleMarkCode,
    'Mod-u': toggleMarkUnderline,
    'Shift-Mod-s': toggleMarkStrikethrough,
    'Ctrl->': wrapInBlockquote,
    'Mod-Enter': chainCommands(exitCode, insertNodeLineBreak),
    'Shift-Enter': chainCommands(exitCode, insertNodeLineBreak),
    'Ctrl-Enter': chainCommands(exitCode, insertNodeLineBreak), // mac-only?
    'Mod-_': insertNodeHorizontalRule,
  });

export const baseKeys = (): Plugin => keymap(baseKeymap);
