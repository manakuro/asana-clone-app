import {
  ChevronRightIcon,
  EllipsisIcon,
  PencilIcon,
} from 'lucide-react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { PageContainer } from '@/components/layout/page-container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useMeQuery } from '@/features/me/api/use-me-query';
import { Spacing } from '@/theme/tokens';
import { useColor } from '@/theme/use-color';

export function Page() {
  const { me, error } = useMeQuery();
  const { colors } = useColor();
  console.log('me: ', me, error);

  return (
    <PageContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon name={PencilIcon} />
          </TouchableOpacity>
          <Text variant="subtitle" style={styles.title}>
            Account
          </Text>
          <TouchableOpacity>
            <Icon name={EllipsisIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.account}>
          <Avatar size={90}>
            <AvatarImage
              source={{
                uri: `https://asanacloneapp.codelly.dev${me?.image}`,
              }}
              style={{ backgroundColor: colors.fg.muted }}
            />

            <AvatarFallback>{me?.name}</AvatarFallback>
          </Avatar>
          <View style={styles.accountContent}>
            <View style={styles.name}>
              <Text variant="subtitle">{me?.name}</Text>
              <Icon style={styles.nameIcon} name={ChevronRightIcon} size="sm" />
            </View>
            <Text variant="caption">{me?.email}</Text>
          </View>
        </View>
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: Spacing['6'],
  },
  title: {
    textAlign: 'center',
    flex: 1,
  },
  account: {
    alignItems: 'center',
    marginTop: Spacing['9'],
    gap: Spacing['4'],
  },
  accountContent: {
    alignItems: 'center',
  },
  name: {
    flexDirection: 'row',
    gap: Spacing['1'],
    alignItems: 'center',
  },
  nameIcon: {
    marginTop: 3,
  },
});
