'use client';

import { memo } from 'react';
import { useWorkspacePageQuery } from './api/use-workspace-page-query';
import { Component } from './component';

export const Page = memo(function Container() {
  const { loading } = useWorkspacePageQuery();

  return <Component loading={loading} />;
});
