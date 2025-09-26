import {
  EditorEmojiMenu,
  EditorMentionMenu,
} from '@/components/features/Menus';
import {
  DuplicateTaskModal,
  EditorLinkModal,
  FileViewerModal,
  InviteModal,
  ProjectDetailModal,
  ShareProjectModal,
  ShareWorkspaceModal,
} from '@/components/features/Modals';
import { Help } from '@/components/features/Navigation';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { memo } from 'react';

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
      <DuplicateTaskModal />
      <ShareProjectModal />
      <ProjectDetailModal />
    </>
  );
});
