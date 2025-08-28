import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Switch,
  type SwitchProps,
} from '@/components/ui/atoms';
import { useClickableHoverStyle } from '@/hooks';

type Props = SwitchProps & {
  label: string;
};
export type CustomFieldProps = Props;

export function CustomField(props: Props) {
  const { clickableHoverInputGrabbableStyle } = useClickableHoverStyle();

  return (
    <FormControl>
      <Flex
        alignItems="center"
        px={1}
        py={2}
        border="1px"
        borderRadius="md"
        borderColor="gray.200"
        boxShadow="md"
        {...clickableHoverInputGrabbableStyle}
        cursor="grab"
      >
        <Icon icon="gridVertical" color="text.muted" size="sm" />
        <FormLabel cursor="grab" ml={2} mb="0" flex={1} fontSize="sm">
          {props.label}
        </FormLabel>
        <Switch
          colorScheme="teal"
          size="sm"
          onChange={props.onChange}
          isChecked={props.isChecked}
        />
      </Flex>
    </FormControl>
  );
}
