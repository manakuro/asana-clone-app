import dynamic from 'next/dynamic';
import { type SyntheticEvent, useCallback, useRef, useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Box } from '@/components/ui/box';
import { Dialog } from '@/components/ui/dialog';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Portal } from '@/components/ui/portal';
import { DurationBar } from '@/components/ui/video-player/duration-bar';
import { Duration } from './duration';
import { useVideoPlayer } from './use-video-player';

const LazyVideoPlayer = dynamic(
  () => import('./video-player').then((m) => m.VideoPlayer),
  {
    ssr: false,
  },
);

export type State = {
  played: number;
  playing: boolean;
  duration: number;
  seeking: boolean;
};
const initialState = (): State => ({
  played: 0,
  playing: true,
  duration: 0,
  seeking: false,
});

export function VideoPlayerDialog() {
  const { state, onClose } = useVideoPlayer();
  const [videoState, setVideoState] = useState<State>(initialState());
  const ref = useRef<HTMLVideoElement>(null);

  const handleClose = useCallback(() => {
    setVideoState(initialState());
    onClose();
  }, [onClose]);

  const handlePlay = useCallback(() => {
    setVideoState((s) => ({ ...s, playing: !videoState.playing }));
  }, [videoState.playing]);

  const handleTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      if (videoState.seeking) return;
      const { currentTime, duration } = event.currentTarget;
      if (!duration) return;
      setVideoState((s) => ({ ...s, played: currentTime / duration }));
    },
    [videoState.seeking],
  );

  const handleDurationChange = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const { duration } = event.currentTarget;
      setVideoState((s) => ({ ...s, duration }));
    },
    [],
  );

  const seekTo = useCallback(
    (amount: number, type: 'seconds' | 'fraction' = 'fraction') => {
      const player = ref.current;
      if (!player) return;
      if (type === 'fraction') {
        if (!player.duration) return;
        player.currentTime = amount * player.duration;
      } else {
        player.currentTime = amount;
      }
    },
    [],
  );

  return (
    <Dialog.Root
      open={state.open}
      onOpenChange={(e) => {
        if (!e.open) {
          onClose();
        }
      }}
      onEscapeKeyDown={handleClose}
      onInteractOutside={handleClose}
      size="xl"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body p={0}>
              <AspectRatio ratio={16 / 9}>
                <Box w="full" borderTopRadius="md">
                  {state.open && (
                    <LazyVideoPlayer
                      src={state.src}
                      playing={videoState.playing}
                      ref={ref}
                      onTimeUpdate={handleTimeUpdate}
                      onDurationChange={handleDurationChange}
                    />
                  )}
                </Box>
              </AspectRatio>
            </Dialog.Body>
            <Dialog.Footer px={4} py={2} justifyContent="flex-start">
              <Flex flex={1}>
                <IconButton
                  borderRadius="full"
                  aria-label="play button"
                  mr={4}
                  onClick={handlePlay}
                  variant="subtle"
                >
                  <Icon
                    icon={videoState.playing ? 'pause' : 'play'}
                    mr={videoState.playing ? 0 : -1}
                  />
                </IconButton>
                <Duration
                  mr={3}
                  seconds={videoState.duration * videoState.played}
                />

                <Flex flex={1} mr={3}>
                  <DurationBar
                    played={videoState.played}
                    seekTo={seekTo}
                    setVideoState={setVideoState}
                  />
                </Flex>

                <Duration
                  seconds={videoState.duration * (1 - videoState.played)}
                />
              </Flex>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
