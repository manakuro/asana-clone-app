import type { FormikProps } from 'formik';

type Props<Values> = {
  formik: FormikProps<Values>;
  name: string;
};
export const useInputText = <Values>(props: Props<Values>) => {
  const { formik, name } = props;

  return {
    fieldProps: {
      ...formik.getFieldProps(name),
      name,
    },
    isInvalid: !!(formik.errors as any)[name] as boolean,
  };
};
