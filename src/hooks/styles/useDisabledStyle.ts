import { useMemo } from 'react'
import { ChakraProps } from 'src/shared/chakra'

type Props = ChakraProps

export const useDisabledStyle = (props?: Props) => {
  const disabledStyle = useMemo<ChakraProps>(
    () => ({
      opacity: '0.4',
      cursor: 'default',
      pointerEvents: 'none',
      ...props,
    }),
    [props],
  )

  return {
    disabledStyle,
  }
}
