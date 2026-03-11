import {
  chakra as ChakraUIChakra,
  type ChakraProps as ChakraUIChakraProps,
  useBreakpointValue as ChakraUseBreakpointValue,
  useDisclosure as ChakraUseDisclosure,
  useStyleConfig as ChakraUseStyleConfig,
} from '@chakra-ui/react';

export type ChakraProps = ChakraUIChakraProps;
export const chakra = ChakraUIChakra;
export const useDisclosure = ChakraUseDisclosure;
export const useStyleConfig = ChakraUseStyleConfig;
export const useBreakpointValue = ChakraUseBreakpointValue;
