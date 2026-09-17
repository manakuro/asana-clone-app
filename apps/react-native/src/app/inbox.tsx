import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useMeQuery } from '@/features/me/api/use-me-query';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/theme/tokens';
import { useColor } from '@/theme/use-color';

function getDevMenuHint() {
  if (Device.isDevice) {
    return (
      <Text variant="caption">
        shake device or press <Text variant="caption">m</Text> in terminal
      </Text>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <Text variant="caption">
      press <Text variant="caption">{shortcut}</Text>
    </Text>
  );
}

export default function HomeScreen() {
  const { me, error } = useMeQuery();
  const { color } = useColor();
  console.log('me: ', me, error);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.heroSection}>
          <AnimatedIcon />
          <Text variant="title" style={styles.title}>
            Welcome to&nbsp;Expo
          </Text>
        </View>

        <Text variant="subtitle" style={styles.code}>
          get started
        </Text>

        <View
          style={[styles.stepContainer, { backgroundColor: color.bg.subtle }]}
        >
          <HintRow
            title="Try editing"
            hint={<Text variant="caption">src/app/index.tsx</Text>}
          />
          <HintRow title="Dev tools" hint={getDevMenuHint()} />
          <HintRow
            title="Fresh start"
            hint={<Text variant="caption">npm run reset-project</Text>}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing['6'],
    alignItems: 'center',
    gap: Spacing['4'],
    paddingBottom: BottomTabInset + Spacing['4'],
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing['6'],
    gap: Spacing['6'],
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing['4'],
    alignSelf: 'stretch',
    paddingHorizontal: Spacing['4'],
    paddingVertical: Spacing['6'],
    borderRadius: Spacing['6'],
  },
});
