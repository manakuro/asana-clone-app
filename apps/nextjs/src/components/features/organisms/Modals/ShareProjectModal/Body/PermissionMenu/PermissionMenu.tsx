import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from '@/components/features/organisms/Menus';
import { Button, Flex, Icon } from '@/components/ui/atoms';
import { MenuItemOption } from '@/components/ui/organisms/Menu';
import { useClickableHoverStyle } from '@/hooks';
import { memo, useCallback, useMemo } from 'react';
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
      placement="bottom-start"
    >
      <MenuSelectButton
        variant="ghost"
        as={Button}
        rightIcon={<Icon icon="chevronDown" />}
        size="sm"
        fontSize="xs"
        fontWeight="medium"
      >
        {buttonText}
      </MenuSelectButton>
      <MenuSelectList
        defaultValue={status.toString()}
        menuListProps={{ maxW: '250px' }}
      >
        {items.map((item, i) => (
          <MenuItemOption
            value={item.value.toString()}
            key={item.value}
            {...clickableHoverStyle}
            _hover={{
              bg: 'gray.100',
            }}
            fontWeight="medium"
          >
            {item.text}
            <Flex fontSize="xs" fontWeight="normal" color="text.muted">
              {item.subText}
            </Flex>
          </MenuItemOption>
        ))}
      </MenuSelectList>
    </MenuSelect>
  );
});
