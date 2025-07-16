import { memo } from 'react'
import { MenuItem } from 'src/components/ui/organisms/Menu'
import { useTaskFeedListItemContext } from '../../Provider'

export const CopyCommentLink = memo(function CopyCommentLink() {
  const { onCopyCommentLink, hasText } = useTaskFeedListItemContext()
  if (!hasText) return null

  return <MenuItem onClick={onCopyCommentLink}>Copy comment link</MenuItem>
})
