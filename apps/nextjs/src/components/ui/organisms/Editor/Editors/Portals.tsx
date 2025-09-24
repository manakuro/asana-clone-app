import { memo } from 'react';
import ReactDOM from 'react-dom';
import { useReactNodeViewPortals } from './ReactNodeViewPortals';

export const Portals = memo(function Portals() {
  const portals = useReactNodeViewPortals();

  return (
    <>
      {portals.map((p) =>
        ReactDOM.createPortal(<p.Component />, p.container, p.key),
      )}
    </>
  );
});
