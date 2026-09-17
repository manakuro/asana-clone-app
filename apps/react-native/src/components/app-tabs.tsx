import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColor } from '@/theme/use-color';

export default function AppTabs() {
  const { color } = useColor();

  return (
    <NativeTabs
      backgroundColor={color.bg.default}
      indicatorColor={color.bg.emphasized}
      labelStyle={{ selected: { color: color.fg.default } }}
      tabBarRespectsIMEInsets
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home_filled" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="my-tasks">
        <NativeTabs.Trigger.Label>My tasks</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="checkmark.circle.fill" md="check_circle" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="inbox">
        <NativeTabs.Trigger.Label>Inbox</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="bell.fill" md="notifications" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="account">
        <NativeTabs.Trigger.Label>Account</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person.fill" md="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
