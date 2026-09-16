import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Spacing } from '@/theme/globals';
import { useColor } from '@/theme/use-color';

type HintRowProps = {
  title?: string;
  hint?: ReactNode;
};

export function HintRow({
  title = 'Try editing',
  hint = 'app/index.tsx',
}: HintRowProps) {
  const muted = useColor('muted');

  return (
    <View style={styles.stepRow}>
      <Text variant="body">{title}</Text>
      <View style={[styles.codeSnippet, { backgroundColor: muted }]}>
        <Text variant="caption">{hint}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeSnippet: {
    borderRadius: Spacing.sm,
    paddingVertical: Spacing['2xs'],
    paddingHorizontal: Spacing.sm,
  },
});
