import deepmerge from 'deepmerge'
import { Options, Query } from './type'

export const subTasks = (
  options?: Options,
  deepMergeOptions?: deepmerge.Options,
): Query =>
  deepmerge<Query>(
    {
      tasks: {
        edges: [
          {
            node: {
              id: '0BA01GK0BWB1Z78B3A3PK7CGE6DHJ',
              name: 'User getting sent duplicate notifications',
              assigneeId: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
              taskFeeds: [
                {
                  id: '0BH01GK0BWBFTRSJ835VPWN29RGXR',
                  taskId: '0BA01GK0BWB1Z78B3A3PK7CGE6DHJ',
                  teammateId: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
                  description: {
                    content: [
                      {
                        content: null,
                        type: 'paragraph',
                      },
                    ],
                    type: 'doc',
                  },
                  isPinned: false,
                  isFirst: true,
                  createdAt: '2022-11-29T09:16:40+09:00',
                  updatedAt: '2022-11-29T09:16:40+09:00',
                  __typename: 'TaskFeed',
                },
              ],
              taskLikes: [],
              taskTags: [],
              isNew: false,
              taskParentId: '0BA01GK0BWB1EDXSFCRV3NGVKN3E8',
              completedAt: '',
              completed: false,
              taskPriorityId: '0AZ01GK0BWB0B1Y7H4B6YASV90HW7',
              dueDate: '2022-12-04T09:16:39+09:00',
              dueTime: '',
              createdBy: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'Task',
            },
            __typename: 'TaskEdge',
          },
          {
            node: {
              id: '0BA01GK0BWB1Z78B3A3PK7FDTDZ5Q',
              name: "User can't invite teammate via modal page",
              assigneeId: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
              taskFeeds: [
                {
                  id: '0BH01GK0BWBFTRSJ835VPWQCP3AC3',
                  taskId: '0BA01GK0BWB1Z78B3A3PK7FDTDZ5Q',
                  teammateId: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
                  description: {
                    content: [
                      {
                        content: null,
                        type: 'paragraph',
                      },
                    ],
                    type: 'doc',
                  },
                  isPinned: false,
                  isFirst: true,
                  createdAt: '2022-11-29T09:16:40+09:00',
                  updatedAt: '2022-11-29T09:16:40+09:00',
                  __typename: 'TaskFeed',
                },
              ],
              taskLikes: [],
              taskTags: [],
              isNew: false,
              taskParentId: '0BA01GK0BWB1EDXSFCRV3NGVKN3E8',
              completedAt: '',
              completed: false,
              taskPriorityId: '0AZ01GK0BWB0B1Y7H4B6YASV90HW7',
              dueDate: '2022-12-01T09:16:39+09:00',
              dueTime: '',
              createdBy: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'Task',
            },
            __typename: 'TaskEdge',
          },
          {
            node: {
              id: '0BA01GK0BWB1Z78B3A3PK7HKTX02A',
              name: 'Broken links on my page',
              assigneeId: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
              taskFeeds: [
                {
                  id: '0BH01GK0BWBFTRSJ835VPWQN3DXS8',
                  taskId: '0BA01GK0BWB1Z78B3A3PK7HKTX02A',
                  teammateId: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
                  description: {
                    content: [
                      {
                        content: null,
                        type: 'paragraph',
                      },
                    ],
                    type: 'doc',
                  },
                  isPinned: false,
                  isFirst: true,
                  createdAt: '2022-11-29T09:16:40+09:00',
                  updatedAt: '2022-11-29T09:16:40+09:00',
                  __typename: 'TaskFeed',
                },
              ],
              taskLikes: [],
              taskTags: [],
              isNew: false,
              taskParentId: '0BA01GK0BWB1EDXSFCRV3NGVKN3E8',
              completedAt: '',
              completed: false,
              taskPriorityId: '0AZ01GK0BWB0B1Y7H4B6YASV90HW7',
              dueDate: '2022-12-01T09:16:39+09:00',
              dueTime: '',
              createdBy: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'Task',
            },
            __typename: 'TaskEdge',
          },
        ],
        __typename: 'TaskConnection',
      },
    },
    (options || {}) as Query,
    {
      arrayMerge(target: any[], source: any[]): any[] {
        if (!source.length) return source

        return [...target, ...source]
      },
      ...deepMergeOptions,
    },
  )
