'use client';

import { memo } from 'react';
import { useWorkspacePageQuery } from './api/queries/use-workspace-page-query';
import { Component } from './component';

export const Container = memo(function Container() {
  const { loading } = useWorkspacePageQuery();

  return <Component loading={loading} />;
});
