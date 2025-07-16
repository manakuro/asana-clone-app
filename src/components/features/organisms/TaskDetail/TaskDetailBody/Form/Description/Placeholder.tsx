import { memo } from 'react'
import { EditorPlaceholder } from 'src/components/ui/organisms/Editor'
import { useDescriptionContext } from './Provider'

export const Placeholder = memo(function Placeholder() {
  const { focused } = useDescriptionContext()

  if (focused) return null

  return (
    <EditorPlaceholder ml={2} mt={2} alignItems="flex-start">
      Add more detail to this task...
    </EditorPlaceholder>
  )
})
