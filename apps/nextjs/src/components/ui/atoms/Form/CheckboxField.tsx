import { Checkbox } from '@/components/ui/atoms';
import { type FieldInputProps, useField } from 'formik';
import type React from 'react';
import { type PropsWithChildren, memo } from 'react';

type Props = PropsWithChildren<{
  name: string;
  value: string;
}>;

export const CheckboxField: React.FC<Props> = memo((props) => {
  const [field] = useField({
    name: props.name,
    type: 'checkbox',
    value: props.value,
  });

  return <Component {...field} {...props} />;
});

type ComponentProps = Props & FieldInputProps<string>;
const Component: React.FC<ComponentProps> = memo((props) => {
  return <Checkbox size="sm" isChecked={props.checked} {...props} />;
});
Component.displayName = 'Component';
CheckboxField.displayName = 'CheckboxField';
