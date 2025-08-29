import { Section } from '@/components/features/organisms/Navigation/Help/Body/GuideListItem/ListItemDetail';
import {
  AspectRatio,
  Box,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@/components/ui/atoms';
import { guide3Item } from './item';

export function SeeMore() {
  return (
    <>
      <Stack spacing={3}>
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
        <UnorderedList ml={4} mt={3} spacing={2}>
          <ListItem fontSize="sm">
            Our app aggregates all your work and updates into one place so you
            aren't checking dozens of tools.
          </ListItem>
          <ListItem fontSize="sm">
            My Tasks is where you prioritize and organize your work every day.
          </ListItem>
          <ListItem fontSize="sm">
            Inbox is a digest of updates across only the work you’re following.
          </ListItem>
          <ListItem fontSize="sm">
            As you assign, complete, and get updates on work, these changes are
            reflected, driving the work forward.
          </ListItem>
        </UnorderedList>
      </Section>
      <Section title="Let teammates know you got it">
        <AspectRatio ratio={4 / 3}>
          <Box w="full" bg="gray.200" borderRadius="md" />
        </AspectRatio>
        <UnorderedList ml={4} mt={3} spacing={2}>
          <ListItem fontSize="sm">
            It’s stressful if you don’t know if a teammate saw your request… or
            if a teammate pings you asking if you saw their email 😱
          </ListItem>
          <ListItem fontSize="sm">
            Instead, you can “like” the task to let its creator know that you’ve
            seen it.
          </ListItem>
        </UnorderedList>
      </Section>
    </>
  );
}
