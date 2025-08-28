import { Icon } from '@/components/ui/atoms';
import { useClickableHoverStyle } from '@/hooks';
import { useProjectTeammatesCommand } from '@/store/entities/projectTeammate';
import type React from 'react';
import { memo, useCallback } from 'react';

type Props = {
  projectTeammateId: string;
  isHovering: boolean;
};

export const DeleteButton = memo(function DeleteButton(props: Props) {
  const { isHovering, projectTeammateId } = props;
  const { setProjectTeammateById } = useProjectTeammatesCommand();
  const { clickableHoverLightStyle } = useClickableHoverStyle();

  const handleClick = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();

      await setProjectTeammateById({
        id: projectTeammateId,
        isOwner: false,
      });
    },
    [projectTeammateId, setProjectTeammateById],
  );

  return (
    <Icon
      ml={2}
      mt="1px"
      icon="x"
      color="text.muted"
      size="sm"
      visibility={isHovering ? 'visible' : 'hidden'}
      {...clickableHoverLightStyle}
      onClick={handleClick}
    />
  );
});
