import { memo } from 'react';
import { Help } from '@/components/layout/navigation';
import { VideoPlayer } from '@/components/ui/video-player';
import { EditorEmojiMenu } from '@/features/editor/components/editor-emoji-menu';
import { EditorLinkModal } from '@/features/editor/components/editor-link-modal/editor-link-modal';
import { EditorMentionMenu } from '@/features/editor/components/editor-mention-menu';
import { ProjectDetailModal } from '@/features/project/components/project-detail-modal/project-detail-modal';
import { ShareProjectModal } from '@/features/project/components/share-project-modal/share-project-modal';
import { FileViewerModal } from '@/features/task/components/file-viewer-modal/file-viewer-modal';
import { InviteModal } from '@/features/teammate/components/invite-modal/invite-modal';
import { ShareWorkspaceModal } from '@/features/workspace/components/share-workspace-modal/share-workspace-modal';

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
