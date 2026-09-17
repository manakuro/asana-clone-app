import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Spacing } from '@/theme/tokens';
import { useColor } from '@/theme/use-color';

type HintRowProps = {
  title?: string;
  hint?: ReactNode;
};

export function HintRow({
  title = 'Try editing',
  hint = 'app/index.tsx',
}: HintRowProps) {
  const { color } = useColor();

  return (
    <View style={styles.stepRow}>
      <Text variant="body">{title}</Text>
      <View style={[styles.codeSnippet, { backgroundColor: color.bg.muted }]}>
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
    borderRadius: Spacing['2'],
    paddingVertical: Spacing['0.5'],
    paddingHorizontal: Spacing['2'],
  },
});
