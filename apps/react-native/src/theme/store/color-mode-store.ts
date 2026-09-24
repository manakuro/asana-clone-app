import type { ColorScheme as Scheme } from '@react-native-themed/core';
import { Appearance } from 'react-native';

export type ColorMode = 'light' | 'dark' | 'system';
type State = Readonly<{ mode: ColorMode; scheme: Scheme }>;

export const isColorMode = (value: unknown): value is ColorMode =>
  value === 'light' || value === 'dark' || value === 'system';

function systemScheme(): Scheme {
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
}

function computeScheme(mode: ColorMode): Scheme {
  return mode === 'system' ? systemScheme() : mode;
}

function syncNativeAppearance(mode: ColorMode) {
  if (typeof Appearance.setColorScheme !== 'function') return;
  Appearance.setColorScheme(mode === 'system' ? 'unspecified' : mode);
}

let state: State = { mode: 'system', scheme: systemScheme() };
const listeners = new Set<() => void>();
// biome-ignore lint/suspicious/useIterableCallbackReturn: use forEach
const emit = () => listeners.forEach((l) => l());

Appearance.addChangeListener(() => {
  if (state.mode !== 'system') return;
  const next = systemScheme();
  if (next === state.scheme) return;
  state = { ...state, scheme: next };
  emit();
});

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): State {
  return state;
}

export function setColorMode(mode: ColorMode) {
  if (!isColorMode(mode)) return;
  // Sync first: when returning to 'system', `Appearance.getColorScheme()`
  // still reports the old override until it's reset to 'unspecified'.
  syncNativeAppearance(mode);
  state = { mode, scheme: computeScheme(mode) };
  emit();
}
