import { FormControl, FormErrorMessage, Input } from '@/components/ui/atoms';
import { type FieldInputProps, useField } from 'formik';
import { memo } from 'react';

type Props = {
  name: string;
};

export const TextField = memo(function TextField(props: Props) {
  const { name } = props;
  const [field, meta] = useField(name);

  return <Component error={meta.error || ''} {...field} name={name} />;
});

type ComponentProps = Props &
  FieldInputProps<string> & {
    error: string;
  };
const Component = memo(function Component(props: ComponentProps) {
  const { error, ...rest } = props;

  console.log('render!: ', props.name);

  return (
    <FormControl isInvalid={!!error}>
      <Input {...rest} fontSize="sm" />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
});
