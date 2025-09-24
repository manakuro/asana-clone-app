import { ComingSoonTooltip } from '@/components/features/molecules/Tooltips';
import { Button } from '@/components/ui/atoms/Button';
import { Divider } from '@/components/ui/atoms/Divider';
import { Flex } from '@/components/ui/atoms/Flex';
import { Icon } from '@/components/ui/atoms/Icon';
import { IconButton } from '@/components/ui/atoms/IconButton';
import { Link } from '@/components/ui/atoms/Link';
import { Stack } from '@/components/ui/atoms/Stack';
import { Text } from '@/components/ui/atoms/Text';
import { formatTaskFileCreatedAt } from '@/shared/date';
import { useTaskFile } from '@/store/entities/taskFile';
import { memo } from 'react';
import { useFileViewerModal } from './useFileViewerModal';

export const Header = memo(function Header() {
  const { onClose, currentTaskFileId } = useFileViewerModal();
  const { taskFile } = useTaskFile(currentTaskFileId);
  const formattedCreateAt = formatTaskFileCreatedAt(taskFile.createdAt);

  return (
    <Flex h="full">
      <Flex flexDirection="column" py={4} px={6}>
        <Text fontSize="md">{taskFile.name}</Text>
        <Text fontSize="sm" color="text.muted">
          {formattedCreateAt}
        </Text>
      </Flex>
      <Stack direction="row" spacing={2} ml="auto" py={4} px={6}>
        <Link href={taskFile.src} download>
          <Button
            leftIcon={<Icon icon="download" />}
            iconSpacing={2}
            variant="ghost"
            lightBg
          >
            Download
          </Button>
        </Link>
        <ComingSoonTooltip>
          <Button
            leftIcon={<Icon icon="commentDots" />}
            iconSpacing={2}
            variant="ghost"
            lightBg
          >
            Add Feedback
          </Button>
        </ComingSoonTooltip>
      </Stack>
      <Divider orientation="vertical" />
      <Flex py={4} px={6} justifyContent="center" alignItems="center">
        <IconButton
          icon={<Icon icon="x" size="lg" />}
          aria-label="close modal"
          variant="ghost"
          light
          onClick={onClose}
        />
      </Flex>
    </Flex>
  );
});
