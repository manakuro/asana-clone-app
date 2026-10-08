import { spacing } from '@react-native-rethemed/chakra-ui-tokens';
import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemed } from '@/theme/themed';

type HintRowProps = {
  title?: string;
  hint?: ReactNode;
};

export function HintRow({
  title = 'Try editing',
  hint = 'app/index.tsx',
}: HintRowProps) {
  const { colors } = useThemed().semanticTokens;

  return (
    <View style={styles.stepRow}>
      <Text variant="body">{title}</Text>
      <View style={[styles.codeSnippet, { backgroundColor: colors.bg.muted }]}>
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
    borderRadius: spacing['2'],
    paddingVertical: spacing['0.5'],
    paddingHorizontal: spacing['2'],
  },
});
