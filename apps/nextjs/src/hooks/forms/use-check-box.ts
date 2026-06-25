import type { FormikProps } from 'formik';
import type React from 'react';
import { useCallback } from 'react';

type Props<Values> = {
  formik: FormikProps<Values>;
  name: string;
};
export const useCheckBoxMultiple = <Values>(props: Props<Values>) => {
  const { formik, name } = props;
  const values = formik.values as { [k: string]: any };

  const handleCheckBox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentValue = e.target.value;
      const checkboxes: string[] = values[name];
      if (checkboxes.includes(currentValue)) {
        formik.setFieldValue(
          name,
          checkboxes.filter((v) => v !== currentValue),
        );
        return;
      }

      formik.setFieldValue(name, checkboxes.concat(currentValue));
    },
    [formik, name, values],
  );

  const isChecked = useCallback(
    (value: any): boolean => {
      return values.includeOption.includes(value);
    },
    [values],
  );

  return {
    handleCheckBox,
    isChecked,
  };
};
