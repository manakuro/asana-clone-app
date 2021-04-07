import { useDisclosure } from 'src/shared/chakra'
import React, { useCallback, useState } from 'react'

type Props<ListStatus> = {
  onChange: (status: ListStatus) => void
  listStatus?: ListStatus
  onOpened?: () => void
  onClosed?: () => void
}

export type UseMenuSelect<ListStatus> = {
  isOpen: boolean
  onOpen: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClose: () => void
  onChange: (status: ListStatus) => void
  listStatus: ListStatus | undefined
}

export const useMenuSelect = <ListStatus,>(
  props: Props<ListStatus>,
): UseMenuSelect<ListStatus> => {
  const disclosure = useDisclosure()
  const [listStatus, setListStatus] = useState(props.listStatus)

  const onOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      disclosure.onOpen()
      props.onOpened?.()
    },
    [disclosure, props],
  )

  const onClose = useCallback(() => {
    disclosure.onClose()
    props.onClosed?.()
  }, [disclosure, props])

  const onChange = useCallback(
    (status: ListStatus) => {
      setListStatus(status)
      props.onChange(status)
      onClose()
    },
    [onClose, props],
  )

  return {
    isOpen: disclosure.isOpen,
    onOpen,
    onClose,
    onChange,
    listStatus,
  }
}
