import React, { forwardRef } from 'react';
import {
  Text as RNText,
  type TextProps as RNTextProps,
  type TextStyle,
} from 'react-native';
import { FontSize } from '@/theme/globals';
import { useColor } from '@/theme/use-color';

type TextVariant =
  | 'body'
  | 'title'
  | 'subtitle'
  | 'caption'
  | 'heading'
  | 'link';

interface TextProps extends RNTextProps {
  /**
   * - body
   * - title
   * - subtitle
   * - caption
   * - heading
   * - link
   */
  variant?: TextVariant;
  children: React.ReactNode;
}

const headingVariants: TextVariant[] = ['heading', 'title', 'subtitle'];

export const Text = React.memo(
  forwardRef<RNText, TextProps>(
    ({ variant = 'body', style, children, ...props }, ref) => {
      const textColor = useColor('text');
      const mutedColor = useColor('textMuted');
      const defaultAccessibilityRole = headingVariants.includes(variant)
        ? 'header'
        : undefined;

      const getTextStyle = (): TextStyle => {
        const baseStyle: TextStyle = {
          color: textColor,
        };

        switch (variant) {
          case 'heading':
            return {
              ...baseStyle,
              fontSize: 28,
              fontWeight: '700',
            };
          case 'title':
            return {
              ...baseStyle,
              fontSize: 24,
              fontWeight: '700',
            };
          case 'subtitle':
            return {
              ...baseStyle,
              fontSize: 19,
              fontWeight: '600',
            };
          case 'caption':
            return {
              ...baseStyle,
              fontSize: 14,
              fontWeight: '400',
              color: mutedColor,
            };
          case 'link':
            return {
              ...baseStyle,
              fontSize: FontSize,
              fontWeight: '500',
              textDecorationLine: 'underline',
            };
          case 'body':
            return {
              ...baseStyle,
              fontSize: FontSize,
              fontWeight: '400',
            };
        }
      };

      return (
        <RNText
          ref={ref}
          style={[getTextStyle(), style]}
          accessibilityRole={defaultAccessibilityRole}
          {...props}
        >
          {children}
        </RNText>
      );
    },
  ),
);

Text.displayName = 'Text';
