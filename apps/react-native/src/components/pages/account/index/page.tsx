import {
  BellIcon,
  CalendarIcon,
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
import { CardLink } from './components/card-link';

export function Page() {
  const { me } = useMeQuery();
  const { colors } = useColor();

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
        <View style={styles.links}>
          <CardLink onPress={() => {}}>
            <View style={styles.linkContent}>
              <Icon name={CalendarIcon} />
              <Text variant="caption" style={{ color: colors.fg.default }}>
                Out of office
              </Text>
            </View>
          </CardLink>
          <CardLink onPress={() => {}}>
            <View style={styles.linkContent}>
              <Icon name={BellIcon} />
              <Text variant="caption" style={{ color: colors.fg.default }}>
                Do not disturb
              </Text>
            </View>
          </CardLink>
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
  links: {
    flexDirection: 'row',
    gap: Spacing['4'],
    paddingHorizontal: Spacing['4'],
    marginTop: Spacing['6'],
  },
  link: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  linkContent: {
    gap: Spacing['1'],
    alignItems: 'center',
  },
});
