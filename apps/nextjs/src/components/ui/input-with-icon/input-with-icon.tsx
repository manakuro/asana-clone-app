import { Icon } from '@/components/ui/icon';
import { Input, InputGroup, type InputProps } from '@/components/ui/input';
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
    <InputGroup
      startElement={<Icon icon={icon} color="gray.300" {...iconSize} />}
    >
      <Input
        size={size}
        style={
          {
            '--focus-color ': 'primary',
          } as any
        }
        placeholder="Search"
        {...inputProps}
      />
    </InputGroup>
  );
}
