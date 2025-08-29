import { Section } from '@/components/features/organisms/Navigation/Help/Body/GuideListItem/ListItemDetail';
import {
  AspectRatio,
  Box,
  Link,
  ListItem,
  OrderedList,
  Stack,
  Text,
  UnorderedList,
} from '@/components/ui/atoms';
import { guide2Item } from './item';

export function SeeMore() {
  return (
    <>
      <Text fontSize="sm">{guide2Item.description}</Text>
      <UnorderedList ml={4} mt={3} spacing={2}>
        <ListItem fontSize="sm">
          Think about a goal you're working towards, or a regular process you
          follow.
        </ListItem>
        <ListItem fontSize="sm">
          Break it into pieces. What are the action items? Start each task with
          a clear verb.
        </ListItem>
        <ListItem fontSize="sm">
          How can you group them? Put related tasks into sections so that
          they're easier to skim and organize.
        </ListItem>
        <ListItem fontSize="sm">
          Who do you need to help you accomplish each task?
        </ListItem>
      </UnorderedList>
      <Section title="Anatomy of a project">
        <AspectRatio ratio={4 / 3}>
          <Box w="full" bg="gray.200" borderRadius="md" />
        </AspectRatio>
        <OrderedList ml={4} mt={3} spacing={2}>
          <ListItem fontSize="sm">
            <Text as="span" fontSize="sm" fontWeight="bold">
              Sections
            </Text>{' '}
            group tasks for easier organization.
          </ListItem>
          <ListItem fontSize="sm">
            <Text as="span" fontSize="sm" fontWeight="bold">
              Tasks
            </Text>{' '}
            tell you who's doing what by when. They can be to-dos, milestones,
            approvals - and you can tell by the symbol next to them.
          </ListItem>
          <ListItem fontSize="sm">
            <Text as="span" fontSize="sm" fontWeight="bold">
              Project
            </Text>{' '}
            views show tasks in different ways and you can always toggle between
            list, board, timeline, and calendar.
          </ListItem>
        </OrderedList>
        <AspectRatio ratio={4 / 3} mt={3}>
          <Box w="full" bg="gray.200" borderRadius="md" />
        </AspectRatio>
        <OrderedList ml={4} mt={3} spacing={2} start={4}>
          <ListItem fontSize="sm">
            <Text as="span" fontSize="sm" fontWeight="bold">
              The Toolbar
            </Text>{' '}
            helps you filter, sort, and add fields so you only see what you need
            to.
          </ListItem>
          <ListItem fontSize="sm">
            <Text as="span" fontSize="sm" fontWeight="bold">
              Share
            </Text>{' '}
            the project with your teammates so they have visibility into the
            plan and get notified for status updates.
          </ListItem>
        </OrderedList>
      </Section>
      <Section title="Anatomy of a task">
        <AspectRatio ratio={4 / 3}>
          <Box w="full" bg="gray.200" borderRadius="md" />
        </AspectRatio>
        <OrderedList ml={4} mt={3} spacing={2}>
          <ListItem fontSize="sm">
            Start{' '}
            <Text as="span" fontSize="sm" fontWeight="bold">
              tasks
            </Text>{' '}
            with clear verbs.
          </ListItem>
          <ListItem fontSize="sm">
            <Text as="span" fontSize="sm" fontWeight="bold">
              Assign
            </Text>{' '}
            it to a teammate with a deadline so it's clear who's responsible for
            what by when.
          </ListItem>
          <ListItem fontSize="sm">
            The same task can be in{' '}
            <Text as="span" fontSize="sm" fontWeight="bold">
              multiple projects
            </Text>{' '}
            to keep it in context without duplication.
          </ListItem>
          <ListItem fontSize="sm">
            Add a{' '}
            <Text as="span" fontSize="sm" fontWeight="bold">
              description
            </Text>{' '}
            with instructions and any relevant attachments.
          </ListItem>
        </OrderedList>
        <AspectRatio ratio={4 / 3} mt={3}>
          <Box w="full" bg="gray.200" borderRadius="md" />
        </AspectRatio>
        <OrderedList ml={4} mt={3} spacing={2} start={5}>
          <ListItem fontSize="sm">
            Leave comments with questions and updates. You can @mention a
            teammate to ping them specifically.
          </ListItem>
        </OrderedList>
      </Section>
      <Section>
        <Stack spacing={3}>
          <Text fontSize="sm">
            Now you're ready to share the project. Invite some teammates so you
            can learn and try together.
          </Text>
          <Text fontSize="sm">
            This{' '}
            <Link
              fontSize="sm"
              color="link"
              href="https://google.com"
              _hover={{
                textDecoration: 'underline !important',
              }}
              isExternal
            >
              list of tips
            </Link>{' '}
            has what you need to get your team on board.
          </Text>
        </Stack>
      </Section>
    </>
  );
}
