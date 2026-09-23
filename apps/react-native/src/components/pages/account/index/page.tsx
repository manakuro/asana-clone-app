import {
  BellIcon,
  CalendarIcon,
  CheckIcon,
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
import { themed } from '@/theme/themed';
import { Radii } from '@/theme/tokens/radii';
import { spacing } from '@/theme/tokens/spacing';
import { useColor } from '@/theme/use-color';
import { CardLink } from './components/card-link';

export function Page() {
  const { me } = useMeQuery();
  const { colors } = useColor();

  return (
    <PageContainer>
      <View style={themed.view({ flex: 1 })}>
        <View
          style={themed.view({
            flexDirection: 'row',
            paddingHorizontal: spacing['4'],
          })}
        >
          <TouchableOpacity>
            <Icon name={PencilIcon} />
          </TouchableOpacity>
          <Text
            variant="subtitle"
            style={themed.text({
              textAlign: 'center',
              flex: 1,
            })}
          >
            Account
          </Text>
          <TouchableOpacity>
            <Icon name={EllipsisIcon} />
          </TouchableOpacity>
        </View>
        <View
          style={themed.view({
            alignItems: 'center',
            marginTop: spacing['9'],
            gap: spacing['4'],
          })}
        >
          <Avatar size={90}>
            <AvatarImage
              source={{
                uri: `https://asanacloneapp.codelly.dev${me?.image}`,
              }}
              style={{ backgroundColor: colors.fg.muted }}
            />

            <AvatarFallback>{me?.name}</AvatarFallback>
          </Avatar>
          <View
            style={themed.view({
              alignItems: 'center',
            })}
          >
            <View
              style={themed.view({
                flexDirection: 'row',
                gap: spacing['1'],
                alignItems: 'center',
              })}
            >
              <Text variant="subtitle">{me?.name}</Text>
              <Icon
                style={themed.view({
                  marginTop: 3,
                })}
                name={ChevronRightIcon}
                size="sm"
              />
            </View>
            <Text variant="caption">{me?.email}</Text>
          </View>
        </View>
        <View
          style={themed.view({
            flexDirection: 'row',
            gap: spacing['4'],
            paddingHorizontal: spacing['4'],
            marginTop: spacing['5'],
          })}
        >
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
        <View
          style={[
            themed.view({
              flex: 1,
              marginTop: spacing['5'],
              borderTopStartRadius: Radii['3xl'],
              borderTopEndRadius: Radii['3xl'],
              paddingHorizontal: spacing['4'],
              paddingTop: spacing['4'],
              gap: spacing['4'],
              backgroundColor: 'bg.subtle',
            }),
          ]}
        >
          <Text
            variant="caption"
            style={themed.text({
              fontWeight: '600',
            })}
          >
            Account
          </Text>
          <View style={themed.view({ gap: spacing['2'] })}>
            <View
              style={themed.view({
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing['4'],
              })}
            >
              <Avatar>
                <AvatarImage
                  source={{
                    uri: `https://asanacloneapp.codelly.dev${me?.image}`,
                  }}
                  style={{ backgroundColor: colors.fg.muted }}
                />
                <AvatarFallback>{me?.name}</AvatarFallback>
              </Avatar>
              <View style={themed.view({ flex: 1 })}>
                <Text variant="subtitle">My Workspace</Text>
              </View>
              <Icon name={CheckIcon} color={colors.teal.solid} />
            </View>
          </View>
        </View>
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  linkContent: themed.view({
    gap: spacing['1'],
    alignItems: 'center',
  }),
});
