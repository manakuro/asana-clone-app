import { TextField } from '@material-ui/core';
import StaticDatePicker, {
  type StaticDatePickerProps,
} from '@material-ui/lab/StaticDatePicker';
import type React from 'react';
import { ConditionalRender } from 'src/components/ui/atoms';

type Props = Omit<StaticDatePickerProps, 'renderInput' | 'openTo'>;

export const DatePicker: React.FC<Props> = (props) => {
  return (
    <ConditionalRender client>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="date"
        {...props}
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </ConditionalRender>
  );
};
