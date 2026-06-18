import { useDisclosure } from '@chakra-ui/react';
import type React from 'react';
import { useCallback } from 'react';
import {
  type Item,
  PADDING_X,
} from '@/components/features/Navigation/Help/Body/GuideListItem';
import { Button } from '@/components/ui/Button';
import { Box } from '@/components/ui/box';
import { Flex } from '@/components/ui/Flex';
import { MoreLink } from '@/components/ui/MoreLink';
import { Text } from '@/components/ui/Text';

type Props = {
  item: Item;
  onToggle: (id: number) => void;
  seeMoreComponent: React.ReactNode;
  nextItem?: Item;
};

export function Detail(props: Props) {
  const { item, onToggle, nextItem, seeMoreComponent } = props;
  const disclosure = useDisclosure();

  const handleContinue = useCallback(() => {
    if (!nextItem) return;
    onToggle(nextItem?.id);
  }, [nextItem, onToggle]);

  if (item.detailComponent)
    return (
      <Flex p={PADDING_X} flexDirection="column">
        {item.detailComponent}
      </Flex>
    );

  return (
    <Flex p={PADDING_X} flexDirection="column">
      {disclosure.open ? (
        <>
          {seeMoreComponent}
          {nextItem && (
            <>
              <Text fontSize="sm" fontWeight="bold" mt={3}>
                Up next:{' '}
                <Text as="span" fontSize="sm">
                  {nextItem?.title}
                </Text>
              </Text>
              <Button
                fontSize="sm"
                colorPalette="teal"
                w="full"
                onClick={handleContinue}
                mt={3}
              >
                Continue
              </Button>
            </>
          )}
        </>
      ) : (
        <>
          <Text fontSize="sm" lineClamp={3}>
            {item.description}
          </Text>
          <Box>
            <MoreLink onClick={disclosure.onOpen}>See more</MoreLink>
          </Box>
          <Text fontSize="xs" color="fg.muted" mt={2} textAlign="right">
            {item.time}
          </Text>
        </>
      )}
    </Flex>
  );
}
