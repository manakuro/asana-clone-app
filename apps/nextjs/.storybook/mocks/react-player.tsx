import { forwardRef, useImperativeHandle } from 'react';

type ReactPlayerProps = {
  url?: string;
  width?: string | number;
  height?: string | number;
  playing?: boolean;
  onProgress?: (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => void;
  onDuration?: (duration: number) => void;
};

const ReactPlayer = forwardRef<
  { seekTo: (amount: number, type?: 'seconds' | 'fraction') => void },
  ReactPlayerProps
>(({ url, width = '100%', height = '100%' }, ref) => {
  useImperativeHandle(ref, () => ({
    seekTo: () => {},
  }));

  return (
    <div
      style={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        color: '#fff',
        fontSize: 14,
      }}
    >
      [ReactPlayer mock] {url}
    </div>
  );
});

ReactPlayer.displayName = 'ReactPlayer';

export default ReactPlayer;
