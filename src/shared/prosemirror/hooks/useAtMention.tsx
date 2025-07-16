import type { Command } from 'prosemirror-commands'
import { useCallback, useMemo } from 'react'
import { MENTION_CHAR } from 'src/shared/prosemirror/plugins/suggestions/suggestMention'
import type { ToolbarItem } from './types'

export const useAtMention = (): ToolbarItem => {
  const action = useCallback<
    (
      state: Parameters<Command>[0],
      dispatch: Parameters<Command>[1],
      view: Parameters<Command>[2],
    ) => boolean
  >((state, dispatch) => {
    const { tr } = state
    dispatch?.(tr.insertText(MENTION_CHAR))

    return true
  }, [])

  return useMemo(
    () => ({
      action,
    }),
    [action],
  )
}
