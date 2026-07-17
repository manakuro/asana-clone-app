import type { EmojiMartData as EmojiData } from '@emoji-mart/data';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import type { Picker as PickerClass } from 'emoji-mart';
import { FrequentlyUsed, init, SearchIndex } from 'emoji-mart';
import type { PropsWithChildren } from 'react';

init({ data });

type Frequent = {
  add: () => void;
  get: (params: { maxFrequentRows: number; perLine: number }) => string[];
  DEFAULTS: string[];
};
const frequentlyModule = FrequentlyUsed as unknown as Frequent;

export const frequently = {
  get: (params: { maxFrequentRows: number; perLine: number }) => {
    return frequentlyModule.get(params);
  },
};

export const searchEmoji = async (value: string): Promise<BaseEmoji[]> => {
  return await SearchIndex.search(value);
};
export const getNative = (emoji: BaseEmoji): string => {
  return emoji.skins?.[0]?.native || '';
};
export const getShortcodes = (emoji: BaseEmoji): string => {
  return emoji.skins?.[0]?.shortcodes || '';
};

export const emojis = (data as EmojiData).emojis as Record<string, BaseEmoji>;

type ExtractProps<T> = {
  [K in keyof T]?: T[K] extends { value: infer V } ? V : never;
};

type Props = ExtractProps<typeof PickerClass.Props>;
export const EmojiPicker = ({
  children,
  ...rest
}: PropsWithChildren<Props>) => {
  return <Picker {...rest}>{children}</Picker>;
};

export type BaseEmoji = {
  id: string;
  keywords: string[];
  name: string;
  skins: {
    native: string;
    unified: string;
    shortcodes: string;
  }[];
  version?: null | number;
  search?: string;
  aliases?: string[];
};

export type SelectedEmoji = {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
  emoticons: string[];
};

export type { EmojiData };
