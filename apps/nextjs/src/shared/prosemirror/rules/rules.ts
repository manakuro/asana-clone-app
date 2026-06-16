import {
  ellipsis,
  emDash,
  inputRules,
  smartQuotes,
  textblockTypeInputRule,
  wrappingInputRule,
} from 'prosemirror-inputrules';
import type { Plugin } from 'prosemirror-state';
import { schema } from '../config';

export const rules = (): Plugin =>
  inputRules({
    rules: [
      ...smartQuotes,
      ellipsis,
      emDash,

      // > blockquote
      wrappingInputRule(/^\s*>\s$/, schema.nodes.blockquote),

      // 1. ordered list
      wrappingInputRule(
        /^(\d+)\.\s$/,
        schema.nodes.list,
        (match) => {
          return { type: 'ordered', start: +(match[1] as string) };
        },
        (match, node) => {
          return (
            node.childCount + Number(node.attrs.start) === +(match[1] as string)
          );
        },
      ),

      // * bullet list
      wrappingInputRule(/^\s*\*\s$/, schema.nodes.list, () => {
        return { type: 'bullet' };
      }),

      // ``` code block
      textblockTypeInputRule(/^```$/, schema.nodes.codeBlock),

      // # heading
      textblockTypeInputRule(/^(#{1,6})\s$/, schema.nodes.heading, (match) => {
        return { level: match[1]?.length };
      }),
    ],
  });
