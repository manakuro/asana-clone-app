'use client';

import { memo } from 'react';
import { DarkMode } from '@/chakra-ui/ui/color-mode';
import { Box } from '@/components/ui/box';
import { Flex } from '@/components/ui/flex';
import { CustomNav } from './CustomNav';
import { Footer } from './Footer';
import { Header } from './Header';
import { useNavigation } from './hooks';
import { MainNav } from './MainNav';
import { Projects } from './Projects';

export const PADDING_X = 4;
export const MAX_WIDTH = '240px';
export const MIN_WIDTH = '53px';
export const Navigation = memo(function Navigation() {
  const { isExpanded } = useNavigation();

  return (
    <DarkMode>
      <Flex
        as="nav"
        w={isExpanded ? MAX_WIDTH : MIN_WIDTH}
        backgroundColor="bg"
        flexDirection="column"
        color="fg"
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
    </DarkMode>
  );
});
