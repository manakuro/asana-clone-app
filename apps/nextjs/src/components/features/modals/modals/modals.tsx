import { memo } from 'react';
import { EditorEmojiMenu } from '@/components/features/menus/editor-emoji-menu';
import { EditorMentionMenu } from '@/components/features/menus/editor-mention-menu';
import { EditorLinkModal } from '@/components/features/modals/editor-link-modal/editor-link-modal';
import { FileViewerModal } from '@/components/features/modals/file-viewer-modal/file-viewer-modal';
import { InviteModal } from '@/components/features/modals/invite-modal/invite-modal';
import { ProjectDetailModal } from '@/components/features/modals/project-detail-modal/project-detail-modal';
import { ShareWorkspaceModal } from '@/components/features/modals/share-workspace-modal/share-workspace-modal';
import { Help } from '@/components/features/navigation';
import { ShareProjectModal } from '@/components/features/projects/components/share-project-modal/share-project-modal';
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
