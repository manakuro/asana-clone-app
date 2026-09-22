import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useColor } from '@/theme/use-color';

export function CardLink({ children }: PropsWithChildren) {
  const { colors } = useColor();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.link,
        {
          borderColor: colors.fg.muted,
          borderWidth: 1,
          borderRadius: 12,
          backgroundColor: pressed ? colors.bg.muted : colors.bg.subtle,
        },
      ]}
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
  },
});
