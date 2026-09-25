import { spacing } from '@react-native-themed/chakra-ui-tokens';
import type { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from '@/components/ui/view';
import { useThemed } from '@/theme/themed';

export function PageContainer({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets();
  const { themed } = useThemed();
  return (
    <View
      style={[
        themed.view({ flex: 1 }),
        { paddingTop: insets.top + spacing['4'] },
      ]}
    >
      {children}
    </View>
  );
}
