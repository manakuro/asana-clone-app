import {
  forwardRef as ChakraForwardRef,
  chakra as ChakraUIChakra,
  type ChakraProps as ChakraUIChakraProps,
  useBreakpointValue as ChakraUseBreakpointValue,
  useDisclosure as ChakraUseDisclosure,
  useStyleConfig as ChakraUseStyleConfig,
  type SystemProps,
} from '@chakra-ui/react'

export type ChakraProps = ChakraUIChakraProps
export const chakra = ChakraUIChakra
export const forwardRef = ChakraForwardRef
export const useDisclosure = ChakraUseDisclosure
export const useStyleConfig = ChakraUseStyleConfig
export const useBreakpointValue = ChakraUseBreakpointValue
export type Colors = SystemProps['color']
