import {
  InboxHeader,
  InboxHeaderRight,
  InboxLeft,
  InboxListHeader,
  InboxRight,
} from '@/components/features/Inbox';
import { Flex } from '@/components/ui/flex';
import { Skeleton } from '@/components/ui/skeleton';
import { Stack } from '@/components/ui/stack';

const BUTTON_HEIGHT = '28px';
const TEXT_HEIGHT = '16px';
const maxH = 72 + 57;
export function InboxSkeleton() {
  return (
    <Flex flex={1} h="full">
      <InboxLeft>
        <InboxHeader>
          <InboxHeaderRight>
            <Skeleton h={BUTTON_HEIGHT} w="61.8px" />
            <Skeleton h={BUTTON_HEIGHT} w="32px" />
          </InboxHeaderRight>
        </InboxHeader>
        <Flex
          h="full"
          maxH={`calc(100vh - ${maxH}px)`}
          overflowY="scroll"
          flexDirection="column"
        >
          <Flex>
            <Flex flexDirection="column" flex={1} maxWidth="full">
              {[...new Array(5)]
                .map((_, i) => i + 1)
                .map((v) => (
                  <Flex flexDirection="column" flex={1} key={v}>
                    <InboxListHeader>
                      <Skeleton h={TEXT_HEIGHT} w="80px" borderRadius="full" />
                    </InboxListHeader>
                    <Flex
                      maxW="inherit"
                      flex={1}
                      px={6}
                      pb={2}
                      borderBottom="1px"
                      borderStyle="solid"
                      borderColor="border"
                      h="122px"
                    >
                      <Flex flexDirection="column" py={4} flex={1}>
                        <Skeleton
                          h={TEXT_HEIGHT}
                          w="86px"
                          borderRadius="full"
                        />
                        <Stack gap={2} mt={3}>
                          <Skeleton
                            h={TEXT_HEIGHT}
                            w="80%"
                            borderRadius="full"
                          />
                          <Skeleton
                            h={TEXT_HEIGHT}
                            w="50%"
                            borderRadius="full"
                          />
                          <Skeleton
                            h={TEXT_HEIGHT}
                            w="30%"
                            borderRadius="full"
                          />
                        </Stack>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
            </Flex>
          </Flex>
        </Flex>
      </InboxLeft>
      <InboxRight>
        <Flex
          borderLeft="1px"
          borderStyle="solid"
          borderColor="border"
          flex={1}
          flexDirection="column"
        >
          <InboxHeader>
            <Skeleton h={BUTTON_HEIGHT} w="117px" />
            <Skeleton h={BUTTON_HEIGHT} w="212px" ml="auto" />
          </InboxHeader>
          <Flex flexDirection="column" flex={1}>
            <Skeleton h="44px" opacity={0.3} />

            <Stack direction="column" gap={4} mt={4} px={6}>
              <Skeleton h={TEXT_HEIGHT} w="60%" borderRadius="full" />
              <Skeleton h={TEXT_HEIGHT} w="50%" borderRadius="full" />
              <Skeleton h={TEXT_HEIGHT} w="40%" borderRadius="full" />
              <Skeleton h={TEXT_HEIGHT} w="45%" borderRadius="full" />
            </Stack>
          </Flex>
        </Flex>
      </InboxRight>
    </Flex>
  );
}
