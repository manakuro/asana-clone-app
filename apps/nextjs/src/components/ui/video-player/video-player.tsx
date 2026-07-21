import { forwardRef, type RefObject, type SyntheticEvent } from 'react';
import ReactPlayer from 'react-player';

type Props = {
  ref: RefObject<HTMLVideoElement>;
  playing: boolean;
  src: string;
  onTimeUpdate: (event: SyntheticEvent<HTMLVideoElement>) => void;
  onDurationChange: (event: SyntheticEvent<HTMLVideoElement>) => void;
};

export const VideoPlayer = forwardRef<HTMLVideoElement, Props>(
  ({ src, playing, onDurationChange, onTimeUpdate }, ref) => {
    return (
      <ReactPlayer
        ref={ref}
        src={src}
        width="100%"
        height="100%"
        playing={playing}
        onTimeUpdate={onTimeUpdate}
        onDurationChange={onDurationChange}
      />
    );
  },
);
