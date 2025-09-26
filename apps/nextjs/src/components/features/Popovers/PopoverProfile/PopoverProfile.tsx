import { AspectRatio } from '@/components/ui/AspectRatio';
import { Box } from '@/components/ui/Box';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Image } from '@/components/ui/Image';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Portal } from '@/components/ui/Portal';
import { PortalManager } from '@/components/ui/PortalManager';
import { Text } from '@/components/ui/Text';
import type React from 'react';

type Props = {
  profile: {
    name: string;
    image: string;
    email: string;
  };
};

export const PopoverProfile: React.FCWithChildren<Props> = (props) => {
  return (
    <PortalManager zIndex={1600}>
      <Popover trigger="hover" isLazy>
        <PopoverTrigger>
          <Box as="span" maxW="max-content">
            {props.children}
          </Box>
        </PopoverTrigger>
        <Portal>
          <PopoverContent w={56} border="none">
            <PopoverBody p={0} boxShadow="md" borderRadius="md">
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
                    <Image
                      src={props.profile.image}
                      w="100%"
                      objectFit="cover"
                    />
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
                <Text fontSize="xs" ml={3} noOfLines={1}>
                  {props.profile.email}
                </Text>
              </Flex>
              <Divider />
              <Flex px={4} py={3} alignItems="center">
                <Button
                  leftIcon={<Icon icon="messageRoundedDots" w={4} h={4} />}
                  variant="outline"
                  size="xs"
                >
                  Send message
                </Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </PortalManager>
  );
};
