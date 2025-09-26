'use client';

import { useWorkspacePageQuery } from '@/hooks/queries/app';
import { memo } from 'react';
import { Component } from './Component';

export const Container = memo(function Container() {
  const { loading } = useWorkspacePageQuery();

  return <Component loading={loading} />;
});
