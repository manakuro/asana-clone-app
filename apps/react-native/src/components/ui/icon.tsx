import type { LucideProps } from 'lucide-react-native';
import type React from 'react';
import { useColor } from '@/theme/use-color';

export type Props = LucideProps & {
  lightColor?: string;
  darkColor?: string;
  name: React.ComponentType<LucideProps>;
};

export function Icon({
  name: IconComponent,
  size = 24,
  strokeWidth = 1.8,
  accessible = false,
  ...rest
}: Props) {
  const { color } = useColor();

  return (
    <IconComponent
      color={color.fg.default}
      size={size}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      accessible={accessible}
      {...rest}
    />
  );
}
