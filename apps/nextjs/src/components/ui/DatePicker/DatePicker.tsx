import { ConditionalRender } from '@/components/ui/atoms';
import { TextField } from '@material-ui/core';
import StaticDatePicker, {
  type StaticDatePickerProps,
} from '@material-ui/lab/StaticDatePicker';

type Props = Omit<StaticDatePickerProps, 'renderInput' | 'openTo'>;

export function DatePicker(props: Props) {
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
}
