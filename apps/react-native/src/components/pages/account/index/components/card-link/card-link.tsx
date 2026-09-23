import type { PropsWithChildren } from 'react';
import { Pressable } from 'react-native';
import { themed } from '@/theme/themed';
import { radii } from '@/theme/tokens/radii';
import { spacing } from '@/theme/tokens/spacing';

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
          paddingVertical: spacing['5'],
          paddingHorizontal: spacing['4'],
          borderColor: 'fg.muted',
          borderWidth: 1,
          borderRadius: radii.xl,
          backgroundColor: pressed ? 'bg.muted' : 'bg.subtle',
        }),
      ]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}
