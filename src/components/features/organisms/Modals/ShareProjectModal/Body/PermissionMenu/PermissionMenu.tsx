import React, { memo, useCallback, useMemo } from 'react'
import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from 'src/components/features/organisms/Menus'
import { Button, Icon, Flex } from 'src/components/ui/atoms'
import { MenuItemOption } from 'src/components/ui/organisms/Menu'
import { useClickableHoverStyle } from 'src/hooks'
import {
  PROJECT_PERMISSION_CAN_COMMENT,
  PROJECT_PERMISSION_CAN_EDIT,
  ProjectPermissionTypes,
} from './types'
import { useProjectPermission } from './useProjectPermission'

type Props = {}

const items: {
  value: ProjectPermissionTypes
  text: string
  subText: string
}[] = [
  {
    value: PROJECT_PERMISSION_CAN_EDIT,
    text: 'Can edit',
    subText: 'The team can add, edit, and delete anything in the project.',
  },
  {
    value: PROJECT_PERMISSION_CAN_COMMENT,
    text: 'Can comment',
    subText: "The team can comment, but can't edit anything in the project.",
  },
]

export const PermissionMenu: React.FC<Props> = memo<Props>(() => {
  const { status, setStatus } = useProjectPermission()
  const { clickableHoverStyle } = useClickableHoverStyle()

  const handleChange = useCallback(
    (status: ToString<ProjectPermissionTypes>) => {
      setStatus(Number(status) as ProjectPermissionTypes)
    },
    [setStatus],
  )

  const buttonText = useMemo<string>(() => {
    return items.find((i) => i.value === status)!.text
  }, [status])

  return (
    <MenuSelect<ToString<ProjectPermissionTypes>>
      onChange={handleChange}
      placement="bottom-start"
    >
      <MenuSelectButton
        variant="ghost"
        as={Button}
        rightIcon={<Icon icon="chevronDown" />}
        size="sm"
        fontSize="xs"
        fontWeight="medium"
      >
        {buttonText}
      </MenuSelectButton>
      <MenuSelectList
        defaultValue={status.toString()}
        menuListProps={{ maxW: '250px' }}
      >
        {items.map((item, i) => (
          <MenuItemOption
            value={item.value.toString()}
            key={i}
            {...clickableHoverStyle}
            _hover={{
              bg: 'gray.100',
            }}
            fontWeight="medium"
          >
            {item.text}
            <Flex fontSize="xs" fontWeight="normal" color="text.muted">
              {item.subText}
            </Flex>
          </MenuItemOption>
        ))}
      </MenuSelectList>
    </MenuSelect>
  )
})
PermissionMenu.displayName = 'PermissionMenu'
