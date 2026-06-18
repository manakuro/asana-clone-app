import { memo, useCallback } from 'react';
import { Menu } from '@/components/ui/menu';

type Props = {
  value: string;
  text: string;
  onChange?: (val: string) => void;
};

export const Option = memo(function Option(props: Props) {
  const handleChange = useCallback(
    (val: string) => {
      props.onChange?.(val);
    },
    [props],
  );

  return (
    <Menu.RadioItem
      value={props.value}
      onClick={() => handleChange(props.value)}
    >
      {props.text}
      <Menu.ItemIndicator />
    </Menu.RadioItem>
  );
});
