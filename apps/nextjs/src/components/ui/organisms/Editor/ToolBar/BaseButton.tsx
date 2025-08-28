import { IconButton, type IconButtonProps } from '@/components/ui/atoms';
import { Tooltip, type TooltipProps } from '@/components/ui/molecules';
import {
  useEditorStateContext,
  useEditorViewContext,
} from '@/components/ui/organisms/Editor/Editors';
import type { ToolbarItem } from '@/shared/prosemirror/hooks';
import type React from 'react';
import { useCallback } from 'react';

type Props = {
  isActive?: ToolbarItem['isActive'];
  isEnable?: ToolbarItem['isEnable'];
  action: ToolbarItem['action'];
  tooltip: Omit<TooltipProps, 'children'>;
} & Omit<IconButtonProps, 'isActive'>;

export function BaseButton(props: Props) {
  const state = useEditorStateContext();
  const view = useEditorViewContext();
  const { onClick, tooltip, action, isEnable, isActive, ...rest } = props;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!view) return;
      e.preventDefault();
      action(state, view.dispatch, view);
    },
    [action, state, view],
  );

  return (
    <Tooltip hasArrow {...tooltip} size="sm" withIcon openDelay={500}>
      <IconButton
        variant="ghost"
        size="sm"
        colorScheme="teal"
        onMouseDown={handleMouseDown}
        {...rest}
        isActive={isActive?.(state) ?? false}
        isDisabled={isEnable?.(state) === false}
        _disabled={{
          cursor: 'pointer',
          opacity: 0.4,
          boxShadow: 'none',
        }}
      />
    </Tooltip>
  );
}
