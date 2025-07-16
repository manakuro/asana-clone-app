import type React from 'react'
import { memo, useCallback, useState } from 'react'
import { AssignTaskMenu } from 'src/components/features/organisms/Menus'
import { Input as AtomsInput } from 'src/components/ui/atoms'
import { useClickOutside } from 'src/hooks'
import { useDisclosure } from 'src/shared/chakra'
import type { Teammate } from 'src/store/entities/teammate'

type Props = {
  onSelect: (val: Teammate) => void
  onClose: () => void
}

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { onSelect, onClose } = props
  const { ref } = useClickOutside(onClose, {
    hasClickedOutside: (e, helpers) => {
      if (helpers.isContainInPopoverContent(e)) return false
      return true
    },
  })
  const popoverDisclosure = useDisclosure({ defaultIsOpen: true })
  const [value, setValue] = useState<string>('')

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setValue(val)
      if (val) {
        popoverDisclosure.onOpen()
        return
      }
      popoverDisclosure.onClose()
    },
    [popoverDisclosure],
  )

  const handleSelect = useCallback(
    async (val: Teammate) => {
      onSelect(val)
      setValue('')
      onClose()
    },
    [onSelect, onClose],
  )

  return (
    <AssignTaskMenu
      isOpen={popoverDisclosure.isOpen}
      onClose={popoverDisclosure.onClose}
      onSelect={handleSelect}
      placement="bottom-start"
      queryText={value}
      contentStyle={{
        ml: '-16px',
      }}
    >
      <AtomsInput
        ref={ref}
        autoFocus
        variant="unstyled"
        fontSize="xs"
        placeholder="Name or email"
        onChange={handleChange}
        ml={2}
      />
    </AssignTaskMenu>
  )
})
Input.displayName = 'Input'
