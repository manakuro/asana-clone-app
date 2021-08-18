import React, { memo } from 'react'
import { Divider, Flex } from 'src/components/atoms'
import {
  TaskDetailBody,
  TaskDetailHeader,
  TaskDetailFooter,
} from 'src/components/organisms'
import { useClickOutside, useDrawerStyle } from 'src/hooks'

const HEADER_HEIGHT = 71
const TOP = HEADER_HEIGHT

type Props = {
  onClose: () => void
  loading: boolean
  skipElement: (e: Event) => boolean
}

export const Content: React.VFC<Props> = memo((props) => {
  const { skipElement } = props
  const { drawerStyle } = useDrawerStyle()
  const { ref } = useClickOutside(
    () => {
      props.onClose()
    },
    {
      skipElement,
    },
  )

  return (
    <Flex
      flex={1}
      top={`${TOP}px !important`}
      left={0}
      position="absolute"
      borderTop="1px"
      borderLeft="1px"
      borderColor="gray.200"
      boxShadow="none"
      w="full"
      maxH={`calc(100vh - ${TOP}px)`}
      h={`calc(100vh - ${TOP}px)`}
      bg="white"
      flexDirection="column"
    >
      <Flex
        flex={1}
        maxH="inherit"
        h="inherit"
        ref={ref}
        flexDirection="column"
      >
        <Flex p={0}>
          <TaskDetailHeader
            onClose={props.onClose}
            loading={props.loading}
            mode="drawer"
          />
        </Flex>
        <Divider />
        <Flex {...drawerStyle.body} display="flex" flexDirection="column" p={0}>
          <TaskDetailBody isMakePublic loading={props.loading} />
        </Flex>
        <Flex p={0}>
          <TaskDetailFooter loading={props.loading} />
        </Flex>
      </Flex>
    </Flex>
  )
})
Content.displayName = 'Content'
