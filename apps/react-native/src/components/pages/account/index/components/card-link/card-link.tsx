import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Radii } from '@/theme/tokens/radii';
import { Spacing } from '@/theme/tokens/spacing';
import { useColor } from '@/theme/use-color';

type Props = {
  onPress: () => void;
};

export function CardLink({ children, onPress }: PropsWithChildren<Props>) {
  const { colors } = useColor();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.link,
        {
          borderColor: colors.fg.muted,
          borderWidth: 1,
          borderRadius: Radii.xl,
          backgroundColor: pressed ? colors.bg.muted : colors.bg.subtle,
        },
      ]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: Spacing['5'],
    paddingHorizontal: Spacing['4'],
  },
});
