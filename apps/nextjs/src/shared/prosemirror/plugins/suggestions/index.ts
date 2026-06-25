import { suggest } from 'prosemirror-suggest';
import { suggestEmoji } from './suggest-emoji';
import { suggestMention } from './suggest-mention';

export const suggestionPlugin = () => suggest(suggestMention, suggestEmoji);
