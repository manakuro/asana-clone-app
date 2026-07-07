import { useBreakpointValue } from '@/lib/chakra-ui';

export const useResponsive = () => {
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { fallback: 'md' },
  );

  return {
    isMobile,
  };
};
