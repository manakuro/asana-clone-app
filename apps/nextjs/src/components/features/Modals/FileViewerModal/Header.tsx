import { memo } from 'react';
import { ComingSoonTooltip } from '@/components/features/Tooltips';
import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Link } from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';
import { formatTaskFileCreatedAt } from '@/shared/date';
import { useTaskFile } from '@/store/entities/taskFile';
import { useFileViewerModal } from './useFileViewerModal';

export const Header = memo(function Header() {
  const { onClose, currentTaskFileId } = useFileViewerModal();
  const { taskFile } = useTaskFile(currentTaskFileId);
  const formattedCreateAt = formatTaskFileCreatedAt(taskFile.createdAt);

  return (
    <Flex h="full">
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
        <ComingSoonTooltip>
          <Button gap={2} variant="ghost" lightBg>
            <Icon icon="commentDots" />
            Add Feedback
          </Button>
        </ComingSoonTooltip>
      </Stack>
      <Separator orientation="vertical" />
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
