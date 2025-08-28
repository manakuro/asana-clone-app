import { Checkbox } from '@/components/ui/atoms';
import { type FieldInputProps, useField } from 'formik';
import { type PropsWithChildren, memo } from 'react';

type Props = PropsWithChildren<{
  name: string;
  value: string;
}>;

export const CheckboxField = memo(function CheckboxField(props: Props) {
  const [field] = useField({
    name: props.name,
    type: 'checkbox',
    value: props.value,
  });

  return <Component {...field} {...props} />;
});

type ComponentProps = Props & FieldInputProps<string>;
const Component = memo(function Component(props: ComponentProps) {
  return <Checkbox size="sm" isChecked={props.checked} {...props} />;
});
