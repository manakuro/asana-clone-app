import { memo } from 'react';
import {
  AtMention,
  Bold,
  BulletList,
  DecreaseListIndent,
  Emoji,
  IncreaseListIndent,
  Italic,
  Link,
  OrderedList,
  Strikethrough,
  Underline,
} from '@/components/ui/Editor/ToolBar';
import { Separator } from '@/components/ui/Separator';
import { Stack } from '@/components/ui/Stack';
import { useDescriptionContext } from './Provider';

export const ToolBar = memo(function ToolBar() {
  const { focused } = useDescriptionContext();

  return (
    <Stack
      flex={1}
      direction="row"
      gap={0}
      minH={8}
      alignItems="center"
      bg="white"
      flexWrap="wrap"
    >
      {focused && (
        <>
          <Bold />
          <Italic />
          <Underline />
          <Strikethrough />
          <BulletList />
          <OrderedList />
          <IncreaseListIndent />
          <DecreaseListIndent />
          <Link />
          <Separator orientation="vertical" borderColor="gray.400" h={5} />
          <AtMention />
          <Emoji />
        </>
      )}
    </Stack>
  );
});
