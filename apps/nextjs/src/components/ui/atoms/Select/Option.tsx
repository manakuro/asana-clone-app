import { MenuItem } from '@/components/ui/organisms/Menu';
import { memo, useCallback } from 'react';

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
    <MenuItem onClick={() => handleChange(props.value)}>{props.text}</MenuItem>
  );
});
