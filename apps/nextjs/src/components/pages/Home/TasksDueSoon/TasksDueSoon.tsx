import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@/components/ui/Accordion';
import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  NextLink,
  Stack,
} from '@/components/ui/atoms';
import { Tooltip } from '@/components/ui/molecules';
import { useLinkStyle } from '@/hooks';
import { ROUTE_MY_TASKS_LIST } from '@/router';
import { useTasksDueSoonIds } from '@/store/app/home/tasksDueSoon';
import { memo } from 'react';
import { ListItem } from './ListItem';

export const TasksDueSoon = memo(function TasksDueSoon() {
  const { taskIds } = useTasksDueSoonIds();
  const { style } = useLinkStyle();

  return (
    <Accordion allowToggle defaultIndex={0}>
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <Flex py={1} px={2} borderBottom="1px" borderColor="gray.200">
              <AccordionButton p={0} _hover={{ bg: 'none' }} w="auto">
                {isExpanded ? (
                  <Icon icon="chevronDown" mt="1px" />
                ) : (
                  <Icon icon="chevronRight" mt="1px" />
                )}
                <Heading ml={2} as="h4" size="sm" flex="1" textAlign="left">
                  Tasks Due Soon
                </Heading>
              </AccordionButton>
              <Flex alignItems="center" ml="auto">
                <Tooltip
                  hasArrow
                  label="These are your most urgent tasks due in the next five days"
                  aria-label="A tasks due soon description"
                  size="lg"
                  withIcon
                >
                  <Icon icon="help" size="xs" color="gray.500" mt="-1px" />
                </Tooltip>
                <NextLink
                  href={ROUTE_MY_TASKS_LIST.href.pathname()}
                  passHref
                  legacyBehavior
                >
                  <Link {...style} fontSize="xs" ml={1}>
                    See all my tasks
                  </Link>
                </NextLink>
              </Flex>
            </Flex>

            <AccordionPanel p={0}>
              <Box py={4}>
                <Stack spacing={2}>
                  {taskIds?.map((id) => (
                    <ListItem taskId={id} key={id} />
                  ))}
                </Stack>
              </Box>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
});
