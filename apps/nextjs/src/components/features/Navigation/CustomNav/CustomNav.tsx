import { memo } from 'react';
import { Favorites } from './Favorites';
import { SavedSearches } from './SavedSearches';

export const CustomNav = memo(function CustomNav() {
  return (
    <>
      <Favorites />
      <SavedSearches />
    </>
  );
});
