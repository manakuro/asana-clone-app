import { Section } from '@/components/features/Navigation/Help/Body/GuideListItem/ListItemDetail';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Box } from '@/components/ui/box';
import { Link } from '@/components/ui/link';
import { List } from '@/components/ui/list';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { guide2Item } from './item';

export function SeeMore() {
  return (
    <>
      <Text fontSize="sm">{guide2Item.description}</Text>
      <List.Root ml={4} mt={3} gap={2}>
        <List.Item fontSize="sm">
          Think about a goal you're working towards, or a regular process you
          follow.
        </List.Item>
        <List.Item fontSize="sm">
          Break it into pieces. What are the action items? Start each task with
          a clear verb.
        </List.Item>
        <List.Item fontSize="sm">
          How can you group them? Put related tasks into sections so that
          they're easier to skim and organize.
        </List.Item>
        <List.Item fontSize="sm">
          Who do you need to help you accomplish each task?
        </List.Item>
      </List.Root>
      <Section title="Anatomy of a project">
        <AspectRatio ratio={4 / 3}>
          <Box w="full" bg="gray.200" borderRadius="md" />
        </AspectRatio>
        <List.Root as="ol" ml={4} mt={3} gap={2}>
          <List.Item fontSize="sm">
            <Text as="span" fontSize="sm" fontWeight="bold">
              Sections
            </Text>{' '}
            group tasks for easier organization.
          </List.Item>
          <List.Item fontSize="sm">
            <Text as="span" fontSize="sm" fontWeight="bold">
              Tasks
            </Text>{' '}
            tell you who's doing what by when. They can be to-dos, milestones,
            approvals - and you can tell by the symbol next to them.
          </List.Item>
          <List.Item fontSize="sm">
            <Text as="span" fontSize="sm" fontWeight="bold">
              Project
            </Text>{' '}
            views show tasks in different ways and you can always toggle between
            list, board, timeline, and calendar.
          </List.Item>
        </List.Root>
        <AspectRatio ratio={4 / 3} mt={3}>
          <Box w="full" bg="gray.200" borderRadius="md" />
        </AspectRatio>
        <List.Root as="ol" ml={4} mt={3} gap={2}>
          <List.Item fontSize="sm">
            <Text as="span" fontSize="sm" fontWeight="bold">
              The Toolbar
            </Text>{' '}
            helps you filter, sort, and add fields so you only see what you need
            to.
          </List.Item>
          <List.Item fontSize="sm">
            <Text as="span" fontSize="sm" fontWeight="bold">
              Share
            </Text>{' '}
            the project with your teammates so they have visibility into the
            plan and get notified for status updates.
          </List.Item>
        </List.Root>
      </Section>
      <Section title="Anatomy of a task">
        <AspectRatio ratio={4 / 3}>
          <Box w="full" bg="gray.200" borderRadius="md" />
        </AspectRatio>
        <List.Root as="ol" ml={4} mt={3} gap={2}>
          <List.Item fontSize="sm">
            Start{' '}
            <Text as="span" fontSize="sm" fontWeight="bold">
              tasks
            </Text>{' '}
            with clear verbs.
          </List.Item>
          <List.Item fontSize="sm">
            <Text as="span" fontSize="sm" fontWeight="bold">
              Assign
            </Text>{' '}
            it to a teammate with a deadline so it's clear who's responsible for
            what by when.
          </List.Item>
          <List.Item fontSize="sm">
            The same task can be in{' '}
            <Text as="span" fontSize="sm" fontWeight="bold">
              multiple projects
            </Text>{' '}
            to keep it in context without duplication.
          </List.Item>
          <List.Item fontSize="sm">
            Add a{' '}
            <Text as="span" fontSize="sm" fontWeight="bold">
              description
            </Text>{' '}
            with instructions and any relevant attachments.
          </List.Item>
        </List.Root>
        <AspectRatio ratio={4 / 3} mt={3}>
          <Box w="full" bg="gray.200" borderRadius="md" />
        </AspectRatio>
        <List.Root as="ol" ml={4} mt={3} gap={2}>
          <List.Item fontSize="sm">
            Leave comments with questions and updates. You can @mention a
            teammate to ping them specifically.
          </List.Item>
        </List.Root>
      </Section>
      <Section>
        <Stack gap={3}>
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
              target="_blank"
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
