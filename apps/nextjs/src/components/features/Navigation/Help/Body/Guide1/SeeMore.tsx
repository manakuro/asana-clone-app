import { Section } from '@/components/features/Navigation/Help/Body/GuideListItem/ListItemDetail';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Box } from '@/components/ui/box';
import { Link } from '@/components/ui/link';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { guide1Item } from './item';

export function SeeMore() {
  return (
    <>
      <Stack gap={3}>
        <Text fontSize="sm">{guide1Item.description}</Text>
        <Text fontSize="sm">
          There’s no wrong way to use our app but there are best practices and
          frameworks to follow.
        </Text>
      </Stack>
      <Section title="How information is organized">
        <Stack gap={3}>
          <AspectRatio ratio={4 / 3}>
            <Box w="full" bg="gray.200" borderRadius="md" />
          </AspectRatio>
          <Text fontSize="sm">
            <Text fontSize="sm" fontWeight="bold" as="span">
              Tasks
            </Text>{' '}
            are the building blocks of our app that power your projects.
          </Text>
          <Text fontSize="sm">
            <Text fontSize="sm" fontWeight="bold" as="span">
              Projects
            </Text>{' '}
            group tasks, milestones, and relevant collaborators together.
          </Text>
          <Text fontSize="sm">
            <Text fontSize="sm" fontWeight="bold" as="span">
              Teams
            </Text>{' '}
            are the place where your projects live.
          </Text>
        </Stack>
      </Section>
      <Section title="Check fewer tools">
        <Stack gap={3}>
          <AspectRatio ratio={4 / 3}>
            <Box w="full" bg="gray.200" borderRadius="md" />
          </AspectRatio>
          <Text fontSize="sm">
            Our app organizes your files, communications, and project plans all
            in the same place.
          </Text>
        </Stack>
      </Section>
      <Section title="Integrate with your apps">
        <Stack gap={3}>
          <AspectRatio ratio={4 / 3}>
            <Box w="full" bg="gray.200" borderRadius="md" />
          </AspectRatio>
          <Text fontSize="sm">
            Our app{' '}
            <Link
              fontSize="sm"
              color="link"
              href="https://google.com"
              _hover={{
                textDecoration: 'underline !important',
              }}
              target="_blank"
            >
              integrates
            </Link>{' '}
            with dozens of apps you already use to save time and eliminate
            context switching.
          </Text>
        </Stack>
      </Section>
    </>
  );
}
