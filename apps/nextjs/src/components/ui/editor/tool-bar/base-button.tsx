import type React from 'react';
import { useCallback } from 'react';
import {
  useEditorStateContext,
  useEditorViewContext,
} from '@/components/ui/editor/editors';
import { IconButton, type IconButtonProps } from '@/components/ui/icon-button';
import { Tooltip, type TooltipProps } from '@/components/ui/tooltip';
import type { ToolbarItem } from '@/shared/prosemirror/hooks';

type Props = {
  isActive?: ToolbarItem['isActive'];
  isEnable?: ToolbarItem['isEnable'];
  action: ToolbarItem['action'];
  tooltip: TooltipProps;
} & Omit<IconButtonProps, 'isActive'>;

export function BaseButton(props: Props) {
  const state = useEditorStateContext();
  const view = useEditorViewContext();
  const { onClick: _, tooltip, action, isEnable, isActive, ...rest } = props;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!view) return;
      e.preventDefault();
      action(state, view.dispatch, view);
    },
    [action, state, view],
  );

  return (
    <Tooltip showArrow {...tooltip} size="sm" withIcon openDelay={500}>
      <IconButton
        variant="ghost"
        size="sm"
        colorPalette="teal"
        onMouseDown={handleMouseDown}
        {...rest}
        data-active={isActive?.(state) ?? false}
        disabled={isEnable?.(state) === false}
        _disabled={{
          cursor: 'pointer',
          opacity: 0.4,
          boxShadow: 'none',
        }}
      />
    </Tooltip>
  );
}
