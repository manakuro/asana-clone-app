import { memo } from 'react';
import { EditorEmojiMenu } from '@/components/features/menus/editor-emoji-menu';
import { EditorMentionMenu } from '@/components/features/menus/editor-mention-menu';
import {
  EditorLinkModal,
  FileViewerModal,
  InviteModal,
  ProjectDetailModal,
  ShareProjectModal,
  ShareWorkspaceModal,
} from '@/components/features/modals';
import { Help } from '@/components/features/navigation';
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
