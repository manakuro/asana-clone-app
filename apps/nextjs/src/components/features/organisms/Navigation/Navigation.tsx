import { Box, Flex } from '@/components/ui/atoms';
import { memo } from 'react';
import { CustomNav } from './CustomNav';
import { Footer } from './Footer';
import { Header } from './Header';
import { MainNav } from './MainNav';
import { Projects } from './Projects';
import { useNavigation } from './hooks';

export const PADDING_X = 4;
export const MAX_WIDTH = '240px';
export const MIN_WIDTH = '53px';
export const Navigation = memo(function Navigation() {
  const { isExpanded } = useNavigation();

  return (
    <Flex
      as="nav"
      w={isExpanded ? MAX_WIDTH : MIN_WIDTH}
      backgroundColor="gray.800"
      flexDirection="column"
      color="white"
      transition="width .2s"
      overflowX="hidden"
      h="100vh"
      flex="0 0 auto"
    >
      <Header />
      <MainNav />
      <Box overflow="scroll" w={MAX_WIDTH} pb={40} flex="1">
        <CustomNav />
        <Projects />
      </Box>
      <Footer />
    </Flex>
  );
});
