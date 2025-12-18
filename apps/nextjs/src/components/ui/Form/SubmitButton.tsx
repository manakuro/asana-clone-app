import { useFormikContext } from 'formik';
import { memo } from 'react';
import { Button, type ButtonProps } from '@/components/ui/Button';

type Props = ButtonProps;

export const SubmitButton = memo(function SubmitButton(props: Props) {
  const { isValid } = useFormikContext();

  return (
    <Button
      colorScheme="teal"
      size="sm"
      type="submit"
      isDisabled={!isValid}
      {...props}
    />
  );
});
