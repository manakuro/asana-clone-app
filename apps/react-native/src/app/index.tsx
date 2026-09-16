import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useMeQuery } from '@/features/me/api/use-me-query';
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
  const card = useColor('card');
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

        <View style={[styles.stepContainer, { backgroundColor: card }]}>
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
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
