import type React from 'react';
import { useEffect, useState } from 'react';

type Props = {
  client?: boolean;
  server?: boolean;
};

export function ConditionalRender(props: React.PropsWithChildren<Props>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted && props.client) return null;
  if (isMounted && props.server) return null;
  return props.children as React.ReactElement;
}
