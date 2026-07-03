import { uniqBy } from '@/utils';

export const getNodesFromEdges = <
  Node extends { id: string },
  Data extends { edges?: ({ node?: Node | null } | null)[] | null } | null,
>(
  data?: Data | null,
): Node[] => {
  return uniqBy(
    data?.edges?.map((e) => e?.node || []) as Node[],
    'id',
  ) as Node[];
};

export const initialPageInfo = (): {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  endCursor: string;
  startCursor: string;
} => ({
  hasPreviousPage: false,
  hasNextPage: false,
  endCursor: '',
  startCursor: '',
});

export const getPageInfo = <
  PageInfo,
  Data extends {
    pageInfo?: PageInfo | null;
  },
>(
  res: Data | null,
): PageInfo => {
  return (res?.pageInfo || initialPageInfo()) as PageInfo;
};

export const getTotalCount = <
  TotalCount,
  Data extends {
    totalCount?: TotalCount | null;
  },
>(
  res: Data | null,
): TotalCount => {
  return (res?.totalCount ?? 0) as TotalCount;
};
