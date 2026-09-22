import type { LucideProps } from 'lucide-react-native';
import type React from 'react';
import { useColor } from '@/theme/use-color';

export type Props = LucideProps & {
  lightColor?: string;
  darkColor?: string;
  name: React.ComponentType<LucideProps>;
  /**
   * Icon size
   * - 2xs: 14
   * - xs: 16
   * - sm: 20
   * - md: 24
   * - lg: 32
   */
  size?: Size;

  /**
   * specific value for icon size
   */
  sizeValue?: number;
};

const sizes = {
  '2xs': 14,
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
} as const;
type Size = keyof typeof sizes;

export function Icon({
  name: IconComponent,
  size = 'md',
  strokeWidth = 1.8,
  accessible = false,
  sizeValue,
  ...rest
}: Props) {
  const { colors } = useColor();
  return (
    <IconComponent
      color={colors.fg.muted}
      size={sizeValue ?? sizes[size]}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      accessible={accessible}
      {...rest}
    />
  );
}
