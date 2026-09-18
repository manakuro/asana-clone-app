import React, { useEffect } from 'react';
import type { ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { BorderRadius, Corners } from '@/theme/tokens';
import { useColor } from '@/theme/use-color';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  style?: ViewStyle;
  variant?: 'default' | 'rounded';
}

export const Skeleton = React.memo(function Skeleton({
  width = '100%',
  height = 100,
  style,
  variant = 'default',
}: SkeletonProps) {
  const { colors } = useColor();
  const mutedColor = colors.bg.muted;
  // Start the opacity at its lowest point
  const opacity = useSharedValue(0.5);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    // We only define the animation going from 0.5 -> 1.
    // The `withRepeat` function will handle reversing it automatically.
    opacity.value = withRepeat(
      // Animate to an opacity of 1
      withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.quad),
      }),
      -1, // Loop infinitely
      true, // Set to true to automatically reverse the animation (yoyo effect)
    );
  }, [
    // We only define the animation going from 0.5 -> 1.
    // The `withRepeat` function will handle reversing it automatically.
    opacity,
  ]); // Use an empty dependency array as the shared value object is stable

  return (
    <Animated.View
      accessibilityElementsHidden
      accessibilityLabel="Loading content"
      style={[
        {
          width: width as any,
          height,
          backgroundColor: mutedColor,
          borderRadius: variant === 'default' ? Corners : BorderRadius,
        },
        animatedStyle,
        style,
      ]}
    />
  );
});
