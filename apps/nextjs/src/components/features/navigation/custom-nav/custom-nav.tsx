import { memo } from 'react';
import { Favorites } from './favorites';
import { SavedSearches } from './saved-searches';

export const CustomNav = memo(function CustomNav() {
  return (
    <>
      <Favorites />
      <SavedSearches />
    </>
  );
});
