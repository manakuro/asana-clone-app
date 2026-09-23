import type { PropsWithChildren } from 'react';
import { Pressable } from 'react-native';
import { themed } from '@/theme/themed';
import { Radii } from '@/theme/tokens/radii';
import { Spacing } from '@/theme/tokens/spacing';

type Props = {
  onPress: () => void;
};

export function CardLink({ children, onPress }: PropsWithChildren<Props>) {
  return (
    <Pressable
      style={({ pressed }) => [
        themed.view({
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          paddingVertical: Spacing['5'],
          paddingHorizontal: Spacing['4'],
          borderColor: 'fg.muted',
          borderWidth: 1,
          borderRadius: Radii.xl,
          backgroundColor: pressed ? 'bg.muted' : 'bg.subtle',
        }),
      ]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}
