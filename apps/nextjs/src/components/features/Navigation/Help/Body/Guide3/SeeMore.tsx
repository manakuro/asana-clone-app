import { Section } from '@/components/features/Navigation/Help/Body/GuideListItem/ListItemDetail';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Box } from '@/components/ui/box';
import { List } from '@/components/ui/list';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { guide3Item } from './item';

export function SeeMore() {
  return (
    <>
      <Stack gap={3}>
        <Text fontSize="sm">{guide3Item.description}</Text>
        <Text fontSize="sm">
          Start your day knowing what to do, and end your day knowing what’s
          next.
        </Text>
      </Stack>
      <Section title="Collaboration 101">
        <AspectRatio ratio={4 / 3}>
          <Box w="full" bg="gray.200" borderRadius="md" />
        </AspectRatio>
        <List.Root ml={4} mt={3} gap={2}>
          <List.Item fontSize="sm">
            Our app aggregates all your work and updates into one place so you
            aren't checking dozens of tools.
          </List.Item>
          <List.Item fontSize="sm">
            My Tasks is where you prioritize and organize your work every day.
          </List.Item>
          <List.Item fontSize="sm">
            Inbox is a digest of updates across only the work you’re following.
          </List.Item>
          <List.Item fontSize="sm">
            As you assign, complete, and get updates on work, these changes are
            reflected, driving the work forward.
          </List.Item>
        </List.Root>
      </Section>
      <Section title="Let teammates know you got it">
        <AspectRatio ratio={4 / 3}>
          <Box w="full" bg="gray.200" borderRadius="md" />
        </AspectRatio>
        <List.Root ml={4} mt={3} gap={2}>
          <List.Item fontSize="sm">
            It’s stressful if you don’t know if a teammate saw your request… or
            if a teammate pings you asking if you saw their email 😱
          </List.Item>
          <List.Item fontSize="sm">
            Instead, you can “like” the task to let its creator know that you’ve
            seen it.
          </List.Item>
        </List.Root>
      </Section>
    </>
  );
}
