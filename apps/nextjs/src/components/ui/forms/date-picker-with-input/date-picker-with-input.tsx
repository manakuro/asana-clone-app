import { memo, useCallback, useMemo, useState } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { DueDate as AtomsDueDate } from '@/components/ui/due-date';
import { Flex } from '@/components/ui/flex';
import { Icon, type IconProps } from '@/components/ui/icon';
import { useHover } from '@/hooks/useHover';
import type { SystemStyleObject } from '@/shared/chakra';
import { DeleteButton } from './delete-button';
import { Input } from './input';

type Props = {
  onSelect: (val: Date) => void;
  onDelete: () => void;
  dueDate: string;
  fallback?: string;
  buttonStyle?: ButtonProps;
  iconStyle?: Omit<IconProps, 'icon'>;
};

const focusedStyle: ButtonProps = {
  bg: 'transparent',
  border: '1px',
  borderColor: 'gray.200',
  _hover: {
    bg: 'transparent',
  },
};

export const DatePickerWithInput = memo(function DatePickerWithInput(
  props: Props,
) {
  const { onSelect, dueDate, onDelete, buttonStyle, iconStyle } = props;
  const { ref, isHovering } = useHover<HTMLButtonElement>();
  const [focused, setFocused] = useState(false);
  const hasDueDate = useMemo(() => !!dueDate, [dueDate]);
  const colorStyle = useMemo<SystemStyleObject>(
    () => (hasDueDate ? { color: 'fg' } : { color: 'fg.muted' }),
    [hasDueDate],
  );
  const fallback = useMemo(
    () => props.fallback ?? 'No due date',
    [props.fallback],
  );

  const handleClick = useCallback(() => {
    setFocused(true);
  }, []);

  const handleClickInputOutside = useCallback(() => {
    setFocused(false);
  }, []);

  return (
    <Button
      variant="ghost"
      size="sm"
      ref={ref}
      border="1px"
      borderColor="transparent"
      onClick={handleClick}
      cursor="pointer"
      {...(focused ? focusedStyle : {})}
      {...buttonStyle}
    >
      <Flex>
        <Icon icon="calendarAlt" {...colorStyle} {...iconStyle} />
      </Flex>
      {focused ? (
        <Input
          onClose={handleClickInputOutside}
          onClear={onDelete}
          dueDate={dueDate}
          onSelect={onSelect}
        />
      ) : (
        <>
          <AtomsDueDate
            ml={2}
            fontSize="sm"
            dueDate={dueDate}
            fallback={fallback}
            {...colorStyle}
          />
          {hasDueDate && (
            <DeleteButton isHovering={isHovering} onDelete={onDelete} />
          )}
        </>
      )}
    </Button>
  );
});
