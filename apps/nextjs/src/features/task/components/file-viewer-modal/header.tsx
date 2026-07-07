import { memo } from 'react';
import { ComingSoonTooltip } from '@/components/layout/coming-soon-tooltip';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Link } from '@/components/ui/link';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useTaskFile } from '@/features/task/store/task-file';
import { formatTaskFileCreatedAt } from '@/lib/date';
import { useFileViewerModal } from './use-file-viewer-modal';

export const Header = memo(function Header() {
  const { onClose, currentTaskFileId } = useFileViewerModal();
  const { taskFile } = useTaskFile(currentTaskFileId);
  const formattedCreateAt = formatTaskFileCreatedAt(taskFile.createdAt);

  return (
    <Flex h="full" flex={1}>
      <Flex flexDirection="column" py={4} px={6}>
        <Text fontSize="md">{taskFile.name}</Text>
        <Text fontSize="sm" color="fg.muted">
          {formattedCreateAt}
        </Text>
      </Flex>
      <Stack direction="row" gap={2} ml="auto" py={4} px={6}>
        <Link href={taskFile.src} download>
          <Button gap={2} variant="ghost" lightBg>
            <Icon icon="download" />
            Download
          </Button>
        </Link>
        <ComingSoonTooltip
          contentProps={{
            bg: 'bg',
            color: 'fg',
          }}
        >
          <Button gap={2} variant="ghost" lightBg>
            <Icon icon="commentDots" />
            Add Feedback
          </Button>
        </ComingSoonTooltip>
      </Stack>
      <Flex py={4} px={6} justifyContent="center" alignItems="center">
        <IconButton
          aria-label="close modal"
          variant="ghost"
          light
          onClick={onClose}
        >
          <Icon icon="x" size="lg" />
        </IconButton>
      </Flex>
    </Flex>
  );
});
