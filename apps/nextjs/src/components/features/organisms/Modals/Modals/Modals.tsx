import {
  EditorEmojiMenu,
  EditorMentionMenu,
} from '@/components/features/organisms/Menus';
import {
  DuplicateTaskModal,
  EditorLinkModal,
  FileViewerModal,
  InviteModal,
  ProjectDetailModal,
  ShareProjectModal,
  ShareWorkspaceModal,
} from '@/components/features/organisms/Modals';
import { Help } from '@/components/features/organisms/Navigation';
import { VideoPlayer } from '@/components/ui/organisms/VideoPlayer';
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
