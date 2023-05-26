import React, { useCallback } from 'react'
import {
  Menu,
  MenuList,
  MenuButton,
  MenuProps,
  MenuItemOption,
  MenuOptionGroup,
} from 'src/components/ui/organisms/Menu'
import { chakra } from 'src/shared/chakra'
import {
  TaskListCompletedStatusCode,
  TaskListCompletedStatusCodeValue,
} from 'src/store/entities/taskListCompletedStatus'

type Props = {
  onClose: () => void
  listStatus?: TaskListCompletedStatusCodeValue
  onChange: (listStatus: TaskListCompletedStatusCodeValue) => void
} & MenuProps

export const PopoverCompletedTasks: React.FC<Props> = (props) => {
  const handleChange = useCallback(
    (listStatus?: string | string[]) => {
      props.onChange(listStatus as TaskListCompletedStatusCodeValue)
      props.onClose()
    },
    [props],
  )

  return (
    <Menu closeOnBlur={false} closeOnSelect={false} isLazy {...props}>
      <MenuButton w="full" as={MenuButtonAs}>
        {props.children}
      </MenuButton>
      <MenuList pointerEvents="auto" mr="30px">
        <MenuOptionGroup
          value={props.listStatus}
          type="radio"
          onChange={handleChange}
        >
          <MenuItemOption
            value={TaskListCompletedStatusCode.Completed}
            as="div"
          >
            All Completed Tasks
          </MenuItemOption>
          <MenuOptionGroup
            value={props.listStatus}
            title="Marked complete since:"
            color="text.muted"
            fontSize="xs"
            onChange={handleChange}
          >
            <MenuItemOption
              as="div"
              value={TaskListCompletedStatusCode.CompletedToday}
            >
              Today
            </MenuItemOption>
            <MenuItemOption
              as="div"
              value={TaskListCompletedStatusCode.CompletedYesterday}
            >
              Yesterday
            </MenuItemOption>
            <MenuItemOption
              as="div"
              value={TaskListCompletedStatusCode.Completed_1Week}
            >
              1 week
            </MenuItemOption>
            <MenuItemOption
              as="div"
              value={TaskListCompletedStatusCode.Completed_2Weeks}
            >
              2 weeks
            </MenuItemOption>
            <MenuItemOption
              as="div"
              value={TaskListCompletedStatusCode.Completed_3Weeks}
            >
              3 weeks
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

// NOTE: Use custom component instead of `Box` because of styling issue with positioning menu item
const MenuButtonAs = chakra('div', {
  baseStyle: {
    w: 'full',
  },
})
