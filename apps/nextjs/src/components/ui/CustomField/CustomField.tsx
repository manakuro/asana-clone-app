import { Flex } from '@/components/ui/Flex';
import { Field } from '@/components/ui/Form';
import { Icon } from '@/components/ui/Icon';
import { Switch } from '@/components/ui/Switch';
import { useClickableHoverStyle } from '@/hooks';

type Props = {
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
};

export function CustomField(props: Props) {
  const { clickableHoverInputGrabbableStyle } = useClickableHoverStyle();

  return (
    <Field.Root>
      <Flex
        alignItems="center"
        px={1}
        py={2}
        border="1px"
        borderRadius="md"
        borderColor="border"
        borderStyle="solid"
        boxShadow="md"
        css={clickableHoverInputGrabbableStyle}
        cursor="grab"
        w="full"
      >
        <Icon icon="gridVertical" color="text.muted" size="sm" />
        <Field.Label cursor="grab" ml={2} mb="0" flex={1} fontSize="sm">
          {props.label}
        </Field.Label>
        <Switch.Root
          colorPalette="teal"
          size="sm"
          onCheckedChange={(e) => props.onChange(e.checked)}
          checked={props.isChecked}
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label />
        </Switch.Root>
      </Flex>
    </Field.Root>
  );
}
