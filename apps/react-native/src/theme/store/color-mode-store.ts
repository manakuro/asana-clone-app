import { Appearance } from 'react-native';

export type Mode = 'light' | 'dark' | 'system';
type Scheme = 'light' | 'dark';
type State = { mode: Mode; scheme: Scheme };

const isMode = (value: unknown): value is Mode =>
  value === 'light' || value === 'dark' || value === 'system';

function systemScheme(): Scheme {
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
}

function computeScheme(mode: Mode): Scheme {
  return mode === 'system' ? systemScheme() : mode;
}

function syncNativeAppearance(mode: Mode) {
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

export function setMode(mode: Mode) {
  if (!isMode(mode)) return;
  state = { mode, scheme: computeScheme(mode) };
  syncNativeAppearance(mode);
  emit();
}
