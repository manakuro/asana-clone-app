import React, { memo, useCallback, useMemo, useState } from 'react'
import {
  Button,
  ButtonProps,
  Box,
  Icon,
  Flex,
  DueDate as AtomsDueDate,
  IconProps,
} from 'src/components/ui/atoms'
import { useHover } from 'src/hooks/useHover'
import { ChakraProps } from 'src/shared/chakra'
import { DeleteButton } from './DeleteButton'
import { Input } from './Input'

type Props = {
  onSelect: (val: Date) => void
  onDelete: () => void
  dueDate: string
  fallback?: string
  buttonStyle?: ButtonProps
  iconStyle?: Omit<IconProps, 'icon'>
}

const focusedStyle: ButtonProps = {
  bg: 'transparent',
  border: '1px',
  borderColor: 'gray.200',
  _hover: {
    bg: 'transparent',
  },
}

export const DatePickerWithInput: React.FC<Props> = memo<Props>((props) => {
  const { onSelect, dueDate, onDelete, buttonStyle, iconStyle } = props
  const { ref, isHovering } = useHover()
  const [focused, setFocused] = useState(false)
  const hasDueDate = useMemo(() => !!dueDate, [dueDate])
  const colorStyle = useMemo<ChakraProps>(
    () => (hasDueDate ? { color: 'text.base' } : { color: 'text.muted' }),
    [hasDueDate],
  )
  const fallback = useMemo(
    () => props.fallback ?? 'No due date',
    [props.fallback],
  )

  const handleClick = useCallback(() => {
    setFocused(true)
  }, [])

  const handleClickInputOutside = useCallback(() => {
    setFocused(false)
  }, [])

  return (
    <Button
      as={Box}
      variant="ghost"
      size="sm"
      ref={ref}
      border="1px"
      borderColor="transparent"
      onClick={handleClick}
      cursor="pointer"
      {...(focused ? focusedStyle : {})}
      {...buttonStyle}
    >
      <Flex>
        <Icon icon="calendarAlt" {...colorStyle} {...iconStyle} />
      </Flex>
      {focused ? (
        <Input
          onClose={handleClickInputOutside}
          onClear={onDelete}
          dueDate={dueDate}
          onSelect={onSelect}
        />
      ) : (
        <>
          <AtomsDueDate
            ml={2}
            fontSize="sm"
            dueDate={dueDate}
            fallback={fallback}
            {...colorStyle}
          />
          {hasDueDate && (
            <DeleteButton isHovering={isHovering} onDelete={onDelete} />
          )}
        </>
      )}
    </Button>
  )
})
DatePickerWithInput.displayName = 'ProjectDueDate'
