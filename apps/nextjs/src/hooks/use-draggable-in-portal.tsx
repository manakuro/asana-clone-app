import type { DraggableChildrenFn, DraggingStyle } from '@hello-pangea/dnd';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const useDraggableInPortal = () => {
  const self = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.pointerEvents = 'none';
    div.style.top = '0';
    div.style.width = '100%';
    div.style.height = '100%';
    self.current = div;
    document.body.appendChild(div);
    return () => {
      document.body.removeChild(div);
    };
  }, []);

  return (render: DraggableChildrenFn): DraggableChildrenFn =>
    (provided, ...args) => {
      const element = render(provided, ...args);
      if (
        (provided?.draggableProps?.style as DraggingStyle).position === 'fixed'
      ) {
        return createPortal(
          element,
          self.current as HTMLDivElement,
        ) as React.ReactNode;
      }
      return element;
    };
};
