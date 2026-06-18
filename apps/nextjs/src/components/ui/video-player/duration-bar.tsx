import type {
  ChangeEvent,
  ComponentProps,
  Dispatch,
  MouseEvent,
  SetStateAction,
} from 'react';
import { useCallback, useMemo } from 'react';
import { chakra } from '@/shared/chakra';
import type { State } from './video-player';

type InputProps = ComponentProps<typeof chakra.input>;

type Props = {
  played: number;
  setVideoState: Dispatch<SetStateAction<State>>;
  seekTo: (amount: number, type?: 'seconds' | 'fraction') => void;
} & InputProps;

const MIN = 0;
const MAX = 0.999999;
export function DurationBar(props: Props) {
  const { setVideoState, seekTo, played } = props;

  const handleSeekChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setVideoState((s) => ({
        ...s,
        played: Number.parseFloat(e.target.value),
      }));
    },
    [setVideoState],
  );

  const handleSeekMouseDown = useCallback(() => {
    setVideoState((s) => ({ ...s, seeking: true }));
  }, [setVideoState]);

  const handleSeekMouseUp = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      setVideoState((s) => ({ ...s, seeking: false }));
      seekTo(Number.parseFloat((e.target as HTMLInputElement).value));
    },
    [seekTo, setVideoState],
  );

  const percent = useMemo(() => (played / MAX) * 100, [played]);

  return (
    <InputRange
      type="range"
      min={MIN}
      max={MAX}
      step="any"
      value={played}
      onMouseDown={handleSeekMouseDown}
      onMouseUp={handleSeekMouseUp}
      onChange={handleSeekChange}
      percent={percent}
    />
  );
}

type InputRangeProps = {
  percent: number;
};
function InputRange({ percent, ...props }: InputRangeProps & InputProps) {
  return (
    <chakra.input
      css={{
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        appearance: 'none',
        width: '100%',
        '&:focus': {
          outline: 'none',
        },
        '&::-webkit-slider-runnable-track': {
          width: '100%',
          height: '2px',
          cursor: 'pointer',
          borderRadius: '27px',
          backgroundImage: `linear-gradient(90deg, #1a202c ${percent}%, #edf2f7 ${percent}%)`,
        },
        '&::-webkit-slider-thumb': {
          boxShadow: '1px 1px 2px #a0aec0',
          border: '4px solid #ffffff',
          height: '14px',
          width: '14px',
          borderRadius: '50px',
          background: '#1a202c',
          cursor: 'pointer',
          WebkitAppearance: 'none',
          marginTop: '-7px',
        },
        '&::-moz-range-track': {
          width: '100%',
          height: '2px',
          cursor: 'pointer',
          boxShadow: '0 0 0 #000000',
          background: '#edf2f7',
          borderRadius: '27px',
          border: '0 solid #000000',
        },
        '&::-moz-range-thumb': {
          boxShadow: '1px 1px 2px #a0aec0',
          border: '4px solid #ffffff',
          height: '14px',
          width: '14px',
          borderRadius: '50px',
          background: '#1a202c',
          cursor: 'pointer',
        },
        '&::-ms-track': {
          width: '100%',
          height: '2px',
          cursor: 'pointer',
          background: 'transparent',
          borderColor: 'transparent',
          color: 'transparent',
        },
        '&::-ms-fill-lower': {
          background: '#1a202c',
          borderRadius: '54px',
        },
        '&::-ms-fill-upper': {
          background: '#1a202c',
          borderRadius: '54px',
        },
        '&::-ms-thumb': {
          marginTop: '1px',
          boxShadow: '1px 1px 2px #a0aec0',
          border: '4px solid #ffffff',
          height: '14px',
          width: '14px',
          borderRadius: '50px',
          background: '#1a202c',
          cursor: 'pointer',
        },
        '&:focus::-ms-fill-lower': {
          background: '#edf2f7',
        },
        '&:focus::-ms-fill-upper': {
          background: '#edf2f7',
        },
      }}
      {...props}
    />
  );
}
