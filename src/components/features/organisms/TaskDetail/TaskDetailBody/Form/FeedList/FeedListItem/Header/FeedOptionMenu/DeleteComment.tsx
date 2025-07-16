import { memo } from 'react'
import { MenuItem } from 'src/components/ui/organisms/Menu'
import { useTaskFeedListItemContext } from '../../Provider'

export const DeleteComment = memo(function DeleteComment() {
  const { hasText, onDelete } = useTaskFeedListItemContext()
  if (!hasText) return null

  return (
    <MenuItem color="alert" onClick={onDelete}>
      Delete comment
    </MenuItem>
  )
})
