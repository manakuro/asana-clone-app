import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  type InputProps,
} from '@/components/ui/atoms';
import type { IconType } from '@/shared/icons';

type Props = InputProps & {
  icon: IconType;
};
export type InputWithIconProps = Props;

const iconSizes = {
  lg: {
    w: '1.25em',
    h: '1.25em',
  },
  md: {
    w: '1.25em',
    h: '1.25em',
  },
  sm: {
    w: '1em',
    h: '1em',
  },
  xs: {
    w: '0.875em',
    h: '0.875em',
  },
} as const;
type IconSizes = keyof typeof iconSizes;

export function InputWithIcon(props: Props) {
  const { icon, size, ...inputProps } = props;
  const iconSize = iconSizes[(size as IconSizes) ?? 'md'];

  return (
    <InputGroup size={size}>
      <InputLeftElement
        pointerEvents="none"
        // biome-ignore lint/correctness/noChildrenProp: <explanation>
        children={<Icon icon={icon} color="gray.300" {...iconSize} />}
      />
      <Input focusBorderColor="primary" placeholder="Search" {...inputProps} />
    </InputGroup>
  );
}
