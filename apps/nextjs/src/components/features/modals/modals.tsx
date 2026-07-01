import { memo } from 'react';
import { EditorEmojiMenu } from '@/components/features/editor/components/editor-emoji-menu';
import { EditorLinkModal } from '@/components/features/editor/components/editor-link-modal/editor-link-modal';
import { EditorMentionMenu } from '@/components/features/editor/components/editor-mention-menu';
import { Help } from '@/components/features/navigation';
import { ProjectDetailModal } from '@/components/features/projects/components/project-detail-modal/project-detail-modal';
import { ShareProjectModal } from '@/components/features/projects/components/share-project-modal/share-project-modal';
import { FileViewerModal } from '@/components/features/tasks/components/file-viewer-modal/file-viewer-modal';
import { InviteModal } from '@/components/features/teammates/components/invite-modal/invite-modal';
import { ShareWorkspaceModal } from '@/components/features/workspaces/components/share-workspace-modal/share-workspace-modal';
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
