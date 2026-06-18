import { type FieldInputProps, useField } from 'formik';
import { memo, type PropsWithChildren } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

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
const Component = memo(function Component({
  children,
  checked,
  ...rest
}: ComponentProps) {
  return (
    <Checkbox.Root size="sm" checked={checked} cursor="pointer" {...rest}>
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label>{children}</Checkbox.Label>
    </Checkbox.Root>
  );
});
