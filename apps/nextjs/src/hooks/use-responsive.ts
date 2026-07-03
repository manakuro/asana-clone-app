import { useBreakpointValue } from '@/lib/chakra';

export const useResponsive = () => {
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { fallback: 'md' },
  );

  return {
    isMobile,
  };
};
