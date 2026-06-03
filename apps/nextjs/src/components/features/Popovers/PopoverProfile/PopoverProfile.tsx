import type { PropsWithChildren } from 'react';

import { AspectRatio } from '@/components/ui/AspectRatio';
import { Box } from '@/components/ui/Box';
import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Image } from '@/components/ui/Image';
import { HoverCard } from '@/components/ui/Popover';
import { Portal } from '@/components/ui/Portal';
import { Separator } from '@/components/ui/Separator';
import { Text } from '@/components/ui/Text';

type Props = {
  profile: {
    name: string;
    image: string;
    email: string;
  };
  portal?: boolean;
};

export function PopoverProfile(props: PropsWithChildren<Props>) {
  const portal = props.portal ?? true;

  return (
    <HoverCard.Root lazyMount>
      <HoverCard.Trigger asChild>
        <Box as="span" maxW="max-content">
          {props.children}
        </Box>
      </HoverCard.Trigger>
      <Portal disabled={!portal}>
        <HoverCard.Positioner>
          <HoverCard.Content
            w={56}
            border="none"
            p={0}
            boxShadow="md"
            borderRadius="md"
          >
            <AspectRatio ratio={4 / 3}>
              <Flex
                bg="teal.400"
                w="full"
                justifyContent="flex-start"
                alignItems="flex-end !important"
                borderTopRadius="md"
              >
                <Flex
                  w="full"
                  justifyContent="center"
                  position="absolute"
                  bg="teal.400"
                >
                  <Image src={props.profile.image} w="100%" objectFit="cover" />
                </Flex>
                <Text
                  w="full"
                  fontSize="sm"
                  fontWeight="bold"
                  color="white"
                  px={3}
                  py={1}
                  zIndex="docked"
                  bgGradient="linear(to-b, transparent, gray.700)"
                >
                  {props.profile.name}
                </Text>
              </Flex>
            </AspectRatio>
            <Flex px={4} py={3} alignItems="center">
              <Icon icon="mailOutline" w={4} h={4} />
              <Text fontSize="xs" ml={3} lineClamp={1}>
                {props.profile.email}
              </Text>
            </Flex>
            <Separator />
            <Flex px={4} py={3} alignItems="center">
              <Button variant="outline" size="xs">
                <Icon icon="messageRoundedDots" w={4} h={4} />
                Send message
              </Button>
            </Flex>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  );
}
