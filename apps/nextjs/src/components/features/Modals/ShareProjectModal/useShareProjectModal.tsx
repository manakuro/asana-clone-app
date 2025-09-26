import { atom, useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import { useCallback } from 'react';
import { type Index, MEMBERS_INDEX, SHARE_INDEX } from './types';
import { useShareProjectModalInvitedTeammates } from './useShareProjectModalInvitedTeammates';

const openAtom = atom(false);

const projectIdAtom = atomWithReset<string>('');

const tabIndexAtom = atomWithReset<Index>(0);

export const useShareProjectModal = () => {
  const { resetInvitedTeammates } = useShareProjectModalInvitedTeammates();
  const [isOpen, setIsOpen] = useAtom(openAtom);
  const [projectId, setProjectId] = useAtom(projectIdAtom);
  const resetProjectId = useResetAtom(projectIdAtom);

  const [tabIndex, setTabIndex] = useAtom(tabIndexAtom);
  const resetTabIndex = useResetAtom(tabIndexAtom);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
    resetProjectId();
    resetTabIndex();
    resetInvitedTeammates();
  }, [setIsOpen, resetProjectId, resetTabIndex, resetInvitedTeammates]);

  const setShareTab = useCallback(() => {
    setTabIndex(SHARE_INDEX);
  }, [setTabIndex]);

  const setMembersTab = useCallback(() => {
    setTabIndex(MEMBERS_INDEX);
  }, [setTabIndex]);

  return {
    isOpen,
    onOpen,
    onClose,
    projectId,
    setProjectId,
    setShareTab,
    setMembersTab,
    tabIndex,
  };
};
