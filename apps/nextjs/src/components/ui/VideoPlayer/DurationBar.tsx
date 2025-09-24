import { type ChakraProps, chakra } from '@/shared/chakra';
import styled from '@emotion/styled';
import type React from 'react';
import { useCallback, useMemo } from 'react';
import type { State } from './VideoPlayer';

type Props = {
  played: number;
  setVideoState: React.Dispatch<React.SetStateAction<State>>;
  seekTo: (amount: number, type?: 'seconds' | 'fraction') => void;
} & ChakraProps;

const MIN = 0;
const MAX = 0.999999;
export function DurationBar(props: Props) {
  const { setVideoState, seekTo, played } = props;

  const handleSeekChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    (e: React.MouseEvent<HTMLInputElement>) => {
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
const InputRange = chakra(styled.input<InputRangeProps>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    border-radius: 27px;
    background-image: ${(props) =>
      `linear-gradient(90deg, #1a202c ${props.percent}%, #edf2f7 ${props.percent}%)`};
  }
  &::-webkit-slider-thumb {
    box-shadow: 1px 1px 2px #a0aec0;
    border: 4px solid #ffffff;
    height: 14px;
    width: 14px;
    border-radius: 50px;
    background: #1a202c;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -7px;
  }
  &::-moz-range-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    box-shadow: 0 0 0 #000000;
    background: #edf2f7;
    border-radius: 27px;
    border: 0 solid #000000;
  }
  &::-moz-range-thumb {
    box-shadow: 1px 1px 2px #a0aec0;
    border: 4px solid #ffffff;
    height: 14px;
    width: 14px;
    border-radius: 50px;
    background: #1a202c;
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #1a202c;
    border-radius: 54px;
  }
  &::-ms-fill-upper {
    background: #1a202c;
    border-radius: 54px;
  }
  &::-ms-thumb {
    margin-top: 1px;
    box-shadow: 1px 1px 2px #a0aec0;
    border: 4px solid #ffffff;
    height: 14px;
    width: 14px;
    border-radius: 50px;
    background: #1a202c;
    cursor: pointer;
  }
  &:focus::-ms-fill-lower {
    background: #edf2f7;
  }
  &:focus::-ms-fill-upper {
    background: #edf2f7;
  }
`);
