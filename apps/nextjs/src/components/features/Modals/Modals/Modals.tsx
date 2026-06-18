import { memo } from 'react';
import {
  EditorEmojiMenu,
  EditorMentionMenu,
} from '@/components/features/Menus';
import {
  EditorLinkModal,
  FileViewerModal,
  InviteModal,
  ProjectDetailModal,
  ShareProjectModal,
  ShareWorkspaceModal,
} from '@/components/features/Modals';
import { Help } from '@/components/features/Navigation';
import { VideoPlayer } from '@/components/ui/video-player';

export const Modals = memo(function Modals() {
  return (
    <>
      <InviteModal />
      <ShareWorkspaceModal />
      <Help />
      <VideoPlayer />
      <EditorLinkModal />
      <EditorMentionMenu />
      <EditorEmojiMenu />
      <FileViewerModal />
      <ShareProjectModal />
      <ProjectDetailModal />
    </>
  );
});
