import { memo } from 'react';
import { MEMBERS_INDEX, SHARE_INDEX } from '../types';
import { useShareProjectModal } from '../useShareProjectModal';
import { Members } from './Members';
import { Share } from './Share';

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
