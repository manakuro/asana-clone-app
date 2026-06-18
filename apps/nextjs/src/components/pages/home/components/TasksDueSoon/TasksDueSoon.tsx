import { memo } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { Box } from '@/components/ui/box';
import { Flex } from '@/components/ui/flex';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import { NextLink } from '@/components/ui/next-link';
import { Stack } from '@/components/ui/stack';
import { Tooltip } from '@/components/ui/tooltip';
import { useLinkStyle } from '@/hooks';
import { ROUTE_MY_TASKS_LIST } from '@/router';
import { useTasksDueSoonIds } from '@/store/app/home/tasksDueSoon';
import { ListItem } from './ListItem';

export const TasksDueSoon = memo(function TasksDueSoon() {
  const { taskIds } = useTasksDueSoonIds();
  const { style } = useLinkStyle();

  return (
    <Accordion.Root collapsible defaultValue={['0']}>
      <Accordion.Item border="none" value="0">
        <Accordion.ItemContext>
          {({ expanded }) => (
            <>
              <Flex
                py={1}
                px={2}
                borderBottom="1px"
                borderColor="border"
                borderStyle="solid"
              >
                <Accordion.ItemTrigger p={0} _hover={{ bg: 'none' }} w="auto">
                  {expanded ? (
                    <Icon icon="chevronDown" mt="1px" />
                  ) : (
                    <Icon icon="chevronRight" mt="1px" />
                  )}
                  <Heading ml={2} as="h4" size="sm" flex="1" textAlign="left">
                    Tasks Due Soon
                  </Heading>
                </Accordion.ItemTrigger>
                <Flex alignItems="center" ml="auto">
                  <Tooltip
                    showArrow
                    content="These are your most urgent tasks due in the next five days"
                    aria-label="A tasks due soon description"
                    size="lg"
                    withIcon
                  >
                    <Icon icon="help" size="xs" color="gray.500" mt="-1px" />
                  </Tooltip>
                  <Link {...style} fontSize="xs" ml={1} asChild>
                    <NextLink href={ROUTE_MY_TASKS_LIST.href.pathname()}>
                      See all my tasks
                    </NextLink>
                  </Link>
                </Flex>
              </Flex>

              <Accordion.ItemContent>
                <Accordion.ItemBody p={0}>
                  <Box py={4}>
                    <Stack gap={2}>
                      {taskIds?.map((id) => (
                        <ListItem taskId={id} key={id} />
                      ))}
                    </Stack>
                  </Box>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </>
          )}
        </Accordion.ItemContext>
      </Accordion.Item>
    </Accordion.Root>
  );
});
