import React, { memo, useCallback, useState } from 'react'
import { PopoverDueDatePicker } from 'src/components/organisms/Popovers'
import { Input as AtomsInput } from 'src/components/ui/atoms'
import { useClickOutside } from 'src/hooks'
import { useDisclosure } from 'src/shared/chakra'
import { formatDueDateInput } from 'src/shared/date'

type Props = {
  onClose: () => void
  onSelect: (val: Date) => void
  onClear: () => void
  dueDate: string
}

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { onClose, onSelect, dueDate, onClear } = props
  const { ref } = useClickOutside(onClose, {
    hasClickedOutside: (e, helpers) => {
      if (helpers.isContainInPopoverContent(e)) return false
      return true
    },
  })
  const popoverDisclosure = useDisclosure({ defaultIsOpen: true })
  const [value, setValue] = useState<string>(formatDueDateInput(dueDate))

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
    (val: Date) => {
      setValue('')
      onSelect(val)
      onClose()
    },
    [onClose, onSelect],
  )

  const handleClear = useCallback(() => {
    setValue('')
    popoverDisclosure.onClose()
    onClear()
  }, [onClear, popoverDisclosure])

  return (
    <PopoverDueDatePicker
      date={dueDate}
      onChange={handleSelect}
      onClear={handleClear}
      defaultIsOpen
      includeDueTime={false}
    >
      <AtomsInput
        ref={ref}
        autoFocus
        variant="unstyled"
        fontSize="sm"
        onChange={handleChange}
        value={value}
        ml={2}
      />
    </PopoverDueDatePicker>
  )
})
Input.displayName = 'Input'
