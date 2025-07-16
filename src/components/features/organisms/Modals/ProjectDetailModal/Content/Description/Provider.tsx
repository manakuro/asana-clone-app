import type React from 'react'
import { useCallback, useState } from 'react'
import {
  type UseClickOutsideOptionsHasClickedOutside,
  useClickOutside,
} from 'src/hooks'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  focused: boolean
  onFocus: () => void
  ref: React.MutableRefObject<HTMLElement | null>
}

const useValue = (): ContextProps => {
  const [focused, setFocused] = useState(false)

  const hasClickedOutside =
    useCallback<UseClickOutsideOptionsHasClickedOutside>((e, helpers) => {
      // To avoid disappearing emoji picker
      // @see src/components/organisms/Popovers/PopoverEmoji/Content.tsx
      if (helpers.isContainInPopoverContent(e)) return false

      return true
    }, [])

  const { ref } = useClickOutside(
    () => {
      setFocused(false)
    },
    {
      hasClickedOutside,
    },
  )

  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])

  return {
    focused,
    onFocus,
    ref,
  }
}
useValue.__PROVIDER__ =
  'src/components/organisms/TaskDetail/TaskDetailBody/Form/Description/Provider.tsx'
export const { Provider, useContext: useDescriptionContext } =
  createProvider(useValue)
