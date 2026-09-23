import type { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from '@/components/ui/view';
import { styles } from '@/theme/styles';
import { Spacing } from '@/theme/tokens/spacing';

export function PageContainer({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.view({ flex: 1 }),
        { paddingTop: insets.top + Spacing['4'] },
      ]}
    >
      {children}
    </View>
  );
}
