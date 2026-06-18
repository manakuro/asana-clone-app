import { useCallback, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
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

export function VideoPlayer() {
  const { state, onClose } = useVideoPlayer();
  const [videoState, setVideoState] = useState<State>(initialState());
  const ref = useRef<ReactPlayer>(null);

  const handleClose = useCallback(() => {
    setVideoState(initialState());
    onClose();
  }, [onClose]);

  const handlePlay = useCallback(() => {
    setVideoState((s) => ({ ...s, playing: !videoState.playing }));
  }, [videoState.playing]);

  const handleProgress = useCallback(
    (state: {
      played: number;
      playedSeconds: number;
      loaded: number;
      loadedSeconds: number;
    }) => {
      if (videoState.seeking) return;
      setVideoState((s) => ({ ...s, played: state.played }));
    },
    [videoState.seeking],
  );

  const handleDuration = useCallback((duration: number) => {
    setVideoState((s) => ({ ...s, duration }));
  }, []);

  const seekTo = useCallback(
    (amount: number, type?: 'seconds' | 'fraction') => {
      ref.current?.seekTo(amount, type);
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
                  <ReactPlayer
                    ref={ref}
                    url={state.src}
                    width="100%"
                    height="100%"
                    playing={videoState.playing}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                  />
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
