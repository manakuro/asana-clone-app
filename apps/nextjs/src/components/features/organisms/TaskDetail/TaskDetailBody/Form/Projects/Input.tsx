import { ProjectMenu } from '@/components/features/organisms/Menus';
import {
  Input as AtomsInput,
  Flex,
  type InputProps,
} from '@/components/ui/atoms';
import type { MenuListProps } from '@/components/ui/organisms/Menu';
import { useClickOutside } from '@/hooks';
import { useDisclosure } from '@/shared/chakra';
import { useProjectTaskCommand } from '@/store/entities/projectTask';
import type React from 'react';
import { memo, useCallback, useState } from 'react';

type Props = {
  onClose: () => void;
  menuListStyle?: MenuListProps;
  taskId: string;
} & InputProps;

export const Input = memo(function Input(props: Props) {
  const { onClose, menuListStyle, taskId, ...rest } = props;
  const popoverDisclosure = useDisclosure({ defaultIsOpen: true });
  const { addProjectTaskByTaskId } = useProjectTaskCommand();
  const { ref } = useClickOutside(onClose, {
    hasClickedOutside: (e, helpers) => {
      if (helpers.isContainInPopoverContent(e)) return false;
      return true;
    },
  });
  const [value, setValue] = useState<string>('');
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValue(val);
      if (val) {
        popoverDisclosure.onOpen();
        return;
      }
      popoverDisclosure.onClose();
    },
    [popoverDisclosure],
  );

  const handleSelect = useCallback(
    async (projectId: string) => {
      console.log(projectId);
      onClose();
      await addProjectTaskByTaskId({ projectId, taskId });
    },
    [addProjectTaskByTaskId, onClose, taskId],
  );

  return (
    <ProjectMenu
      isOpen={popoverDisclosure.isOpen}
      onClose={popoverDisclosure.onClose}
      onSelect={handleSelect}
      placement="bottom-start"
      queryText={value}
      immediate
    >
      <Flex flexDirection="column">
        <AtomsInput
          ref={ref}
          autoFocus
          fontSize="sm"
          placeholder="Add to a Project"
          variant="outline"
          size="sm"
          border="1px"
          borderColor="gray.400"
          w="full"
          _focus={{
            border: 'gray.400',
          }}
          _hover={{
            border: 'gray.400',
          }}
          {...rest}
          value={value}
          onChange={handleChange}
        />
      </Flex>
    </ProjectMenu>
  );
});
