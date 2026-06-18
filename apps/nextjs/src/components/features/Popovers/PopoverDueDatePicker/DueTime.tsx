import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Option, Select } from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import { useClickableHoverStyle } from '@/hooks';
import { formatDueTime } from '@/shared/date';
import { times } from '@/shared/date/time';

type Props = {
  onClick: () => void;
  isEditing: boolean;
  time?: string;
};

const selects = times().map((t) => ({
  text: t,
  value: t,
}));

export function DueTime(props: Props) {
  const { clickableHoverStyle } = useClickableHoverStyle();
  if (!props.isEditing) {
    return (
      <Tooltip
        showArrow
        content="Add due time"
        aria-label="A due time description"
        size="sm"
      >
        <IconButton
          aria-label="due time"
          onClick={props.onClick}
          variant="ghost"
        >
          <Icon icon="time" color="fg.muted" />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Flex>
      <Flex alignItems="center" flex={1}>
        <Icon icon="time" color="fg.muted" />
        <Text ml={2} fontSize="xs">
          Due time
        </Text>
        <Select
          value={props.time ? formatDueTime(props.time) : ''}
          onChange={(time: string) => console.log(time)}
          ml="auto"
          flex={1}
          size="sm"
          maxW={24}
        >
          {selects.map((s) => (
            <Option key={s.text} value={s.value} text={s.text} />
          ))}
        </Select>
        <Icon {...clickableHoverStyle} ml={1} icon="x" color="fg.muted" />
      </Flex>
    </Flex>
  );
}
