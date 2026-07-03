import type { Node as ProsemirrorNode } from 'prosemirror-model';

export interface ProsemirrorTransformer<T> {
  parse: (input: T) => ProsemirrorNode;
  serialize: (doc: ProsemirrorNode) => T;
}
