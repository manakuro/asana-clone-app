import { memo } from 'react';
import { MainHeader } from '@/components/layout/main-header';
import { Heading } from '@/components/ui/heading';
import { useTasksListContentVerticalScroll } from '../content';

export const Header = memo(function Header() {
  const { isScrolling } = useTasksListContentVerticalScroll();

  return (
    <MainHeader sticky isScrolling={isScrolling}>
      <Heading as="h2" size="lg" fontWeight="semibold">
        Home
      </Heading>
    </MainHeader>
  );
});
