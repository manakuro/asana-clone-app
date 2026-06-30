import { memo } from 'react';
import ReactDOM from 'react-dom';
import { useReactNodeViewPortalsContext } from './react-node-view-context';

export const Portals = memo(function Portals() {
  const portals = useReactNodeViewPortalsContext();

  return (
    <>
      {portals.map((p) =>
        ReactDOM.createPortal(<p.Component />, p.container, p.key),
      )}
    </>
  );
});
