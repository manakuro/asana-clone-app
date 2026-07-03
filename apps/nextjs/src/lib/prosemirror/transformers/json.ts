import type { Schema } from 'prosemirror-model';
import { Node as ProsemirrorNode } from 'prosemirror-model';

import type { ProsemirrorTransformer } from './types';

export const createJSONTransformer = (
  schema: Schema,
): ProsemirrorTransformer<string> => {
  return {
    parse: (json) => {
      return ProsemirrorNode.fromJSON(schema, JSON.parse(json));
    },

    serialize: (doc) => {
      return JSON.stringify(doc.toJSON(), null, 2);
    },
  };
};
