import { useMemo } from 'react'
import { type ChakraProps, useStyleConfig } from 'src/shared/chakra'

type DrawerStyle = {
  body: ChakraProps
  modal: ChakraProps
  closeButton: ChakraProps
  dialogContainer: ChakraProps
  footer: ChakraProps
  header: ChakraProps
  overlay: ChakraProps
}

export const useDrawerStyle = () => {
  const style = useStyleConfig('Drawer') as DrawerStyle

  return {
    drawerStyle: useMemo((): DrawerStyle => {
      return style
    }, [style]),
  }
}
