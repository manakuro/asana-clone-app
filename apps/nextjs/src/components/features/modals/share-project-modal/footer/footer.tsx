import { memo } from 'react';
import { MEMBERS_INDEX, SHARE_INDEX } from '../types';
import { useShareProjectModal } from '../use-share-project-modal';
import { Members } from './members';
import { Share } from './share';

export const Footer = memo(function Footer() {
  const { tabIndex } = useShareProjectModal();

  switch (tabIndex) {
    case SHARE_INDEX: {
      return <Share />;
    }
    case MEMBERS_INDEX: {
      return <Members />;
    }
  }
});
