import {
  BellIcon,
  CalendarIcon,
  CheckIcon,
  ChevronRightIcon,
  EllipsisIcon,
  PencilIcon,
} from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { PageContainer } from '@/components/layout/page-container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useMeQuery } from '@/features/me/api/use-me-query';
import { useThemed } from '@/theme/themed';
import { CardLink } from './components/card-link';

export function Page() {
  const { me } = useMeQuery();
  const { themed, semanticTokens } = useThemed();
  const linkContentStyle = themed.view({
    gap: 1,
    alignItems: 'center',
  });

  return (
    <PageContainer>
      <View style={themed.view({ flex: 1 })}>
        <View
          style={themed.view({
            flexDirection: 'row',
            paddingHorizontal: 4,
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
            marginTop: 9,
            gap: 4,
          })}
        >
          <Avatar size={90}>
            <AvatarImage
              source={{
                uri: `https://asanacloneapp.codelly.dev${me?.image}`,
              }}
              style={{ backgroundColor: semanticTokens.colors.fg.muted }}
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
                gap: 1,
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
            gap: 4,
            paddingHorizontal: 4,
            marginTop: 5,
          })}
        >
          <CardLink onPress={() => {}}>
            <View style={linkContentStyle}>
              <Icon name={CalendarIcon} />
              <Text
                variant="caption"
                style={themed.text({
                  color: 'fg.default',
                })}
              >
                Out of office
              </Text>
            </View>
          </CardLink>
          <CardLink onPress={() => {}}>
            <View style={linkContentStyle}>
              <Icon name={BellIcon} />
              <Text
                variant="caption"
                style={themed.text({
                  color: 'fg.default',
                })}
              >
                Do not disturb
              </Text>
            </View>
          </CardLink>
        </View>
        <View
          style={[
            themed.view({
              flex: 1,
              marginTop: 5,
              borderTopStartRadius: '3xl',
              borderTopEndRadius: '3xl',
              paddingHorizontal: 4,
              paddingTop: 4,
              gap: 4,
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
          <View style={themed.view({ gap: 2 })}>
            <View
              style={themed.view({
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              })}
            >
              <Avatar>
                <AvatarImage
                  source={{
                    uri: `https://asanacloneapp.codelly.dev${me?.image}`,
                  }}
                  style={{ backgroundColor: semanticTokens.colors.fg.muted }}
                />
                <AvatarFallback>{me?.name}</AvatarFallback>
              </Avatar>
              <View style={themed.view({ flex: 1 })}>
                <Text variant="subtitle">My Workspace</Text>
              </View>
              <Icon name={CheckIcon} color={semanticTokens.colors.teal.solid} />
            </View>
          </View>
        </View>
      </View>
    </PageContainer>
  );
}
