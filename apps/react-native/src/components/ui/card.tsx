import type { ReactNode } from 'react';
import { memo } from 'react';
import type {
  TextProps as RNTextProps,
  ViewProps as RNViewProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { BorderRadius } from '@/theme/tokens';
import { useColor } from '@/theme/use-color';

interface CardProps extends RNViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

export const Card = memo(function Card({
  children,
  style,
  ...props
}: CardProps) {
  const { color } = useColor();

  return (
    <View
      style={[
        {
          width: '100%',
          backgroundColor: color.bg.subtle,
          borderRadius: BorderRadius,
          padding: 18,
          shadowColor: color.fg.default,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          elevation: 2,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
});

interface CardHeaderProps extends RNViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

export const CardHeader = memo(function CardHeader({
  children,
  style,
  ...props
}: CardHeaderProps) {
  return (
    <View style={[{ marginBottom: 8 }, style]} {...props}>
      {children}
    </View>
  );
});

interface CardTitleProps extends RNTextProps {
  children: ReactNode;
  style?: TextStyle;
}

export const CardTitle = memo(function CardTitle({
  children,
  style,
  ...props
}: CardTitleProps) {
  return (
    <Text
      variant="title"
      style={[
        {
          marginBottom: 4,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
});

interface CardDescriptionProps extends RNTextProps {
  children: ReactNode;
  style?: TextStyle;
}

export const CardDescription = memo(function CardDescription({
  children,
  style,
  ...props
}: CardDescriptionProps) {
  return (
    <Text variant="caption" style={[style]} {...props}>
      {children}
    </Text>
  );
});

interface CardContentProps extends RNViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

export const CardContent = memo(function CardContent({
  children,
  style,
  ...props
}: CardContentProps) {
  return (
    <View style={[style]} {...props}>
      {children}
    </View>
  );
});

interface CardFooterProps extends RNViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

export const CardFooter = memo(function CardFooter({
  children,
  style,
  ...props
}: CardFooterProps) {
  return (
    <View
      style={[
        {
          marginTop: 16,
          flexDirection: 'row',
          gap: 8,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
});
