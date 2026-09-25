import type { PropsWithChildren } from 'react';
import { Pressable } from 'react-native';
import { useThemed } from '@/theme/themed';

type Props = {
  onPress: () => void;
};

export function CardLink({ children, onPress }: PropsWithChildren<Props>) {
  const { themed } = useThemed();
  return (
    <Pressable
      style={({ pressed }) => [
        themed.view({
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          paddingVertical: 5,
          paddingHorizontal: 4,
          borderColor: 'fg.muted',
          borderWidth: 1,
          borderRadius: 'xl',
          backgroundColor: pressed ? 'bg.muted' : 'bg.subtle',
        }),
      ]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}
