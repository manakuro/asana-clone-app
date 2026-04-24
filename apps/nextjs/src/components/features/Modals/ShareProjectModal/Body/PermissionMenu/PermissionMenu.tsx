import { memo, useCallback, useMemo } from 'react';
import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from '@/components/features/Menus';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';
import { useClickableHoverStyle } from '@/hooks';
import {
  PROJECT_PERMISSION_CAN_COMMENT,
  PROJECT_PERMISSION_CAN_EDIT,
  type ProjectPermissionTypes,
} from './types';
import { useProjectPermission } from './useProjectPermission';

const items: {
  value: ProjectPermissionTypes;
  text: string;
  subText: string;
}[] = [
  {
    value: PROJECT_PERMISSION_CAN_EDIT,
    text: 'Can edit',
    subText: 'The team can add, edit, and delete anything in the project.',
  },
  {
    value: PROJECT_PERMISSION_CAN_COMMENT,
    text: 'Can comment',
    subText: "The team can comment, but can't edit anything in the project.",
  },
];

export const PermissionMenu = memo(function PermissionMenu() {
  const { status, setStatus } = useProjectPermission();
  const { clickableHoverStyle } = useClickableHoverStyle();

  const handleChange = useCallback(
    (status: ToString<ProjectPermissionTypes>) => {
      setStatus(Number(status) as ProjectPermissionTypes);
    },
    [setStatus],
  );

  const buttonText = useMemo<string>(() => {
    return items.find((i) => i.value === status)?.text || '';
  }, [status]);

  return (
    <MenuSelect<ToString<ProjectPermissionTypes>>
      onChange={handleChange}
      positioning={{ placement: 'bottom-start' }}
    >
      <MenuSelectButton
        variant="ghost"
        size="sm"
        fontSize="xs"
        fontWeight="medium"
      >
        {buttonText}
        <Icon icon="chevronDown" />
      </MenuSelectButton>
      <MenuSelectList
        defaultValue={status.toString()}
        menuListProps={{ maxW: '250px' }}
      >
        {items.map((item, _i) => (
          <Menu.RadioItem
            value={item.value.toString()}
            key={item.value}
            {...clickableHoverStyle}
            _hover={{
              bg: 'gray.100',
            }}
            fontWeight="medium"
            flexDirection="column"
            alignItems="flex-start"
          >
            {item.text}
            <Flex fontSize="xs" fontWeight="normal" color="text.muted">
              {item.subText}
            </Flex>
            <Menu.ItemIndicator />
          </Menu.RadioItem>
        ))}
      </MenuSelectList>
    </MenuSelect>
  );
});
