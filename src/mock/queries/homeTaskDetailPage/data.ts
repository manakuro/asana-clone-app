import deepmerge from 'deepmerge'
import { Options, Query } from './type'

export const homeTaskDetailPage = (
  options?: Options,
  deepMergeOptions?: deepmerge.Options,
): Query =>
  deepmerge<Query>(
    {
      teammateTask: {
        id: '0BB01GK0BWB5917JYGVWD1TMKENVS',
        taskId: '0BA01GK0BWB1Z78B3A3PK7J2DGG20',
        teammateId: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
        teammateTaskSectionId: '0AX01GK0BWB36GYZCXKARX898E40B',
        task: {
          id: '0BA01GK0BWB1Z78B3A3PK7J2DGG20',
          name: 'Design iOS prototype',
          description: {
            content: [
              {
                content: null,
                type: 'paragraph',
              },
            ],
            type: 'doc',
          },
          assigneeId: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
          taskFeeds: [
            {
              id: '0BH01GK0BWBFTRSJ835VPVYYJBMHT',
              taskId: '0BA01GK0BWB1Z78B3A3PK7J2DGG20',
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
          taskFeedLikes: [],
          taskFiles: [],
          taskTags: [
            {
              id: '0BF01GK0BWBC6KJ32RV9KJ15FY1Y3',
              tagId: '0BE01GK0BWB0ZRSHP6XPRW8D8G8KA',
              taskId: '0BA01GK0BWB1Z78B3A3PK7J2DGG20',
              tag: {
                id: '0BE01GK0BWB0ZRSHP6XPRW8D8G8KA',
                name: 'Design',
                color: {
                  id: '0AE01GK0BWANSFX67CEBWBN9SAHVK',
                  name: 'gray.400',
                  color: 'gray.400',
                  createdAt: '2022-11-29T09:16:39+09:00',
                  updatedAt: '2022-11-29T09:16:39+09:00',
                  __typename: 'Color',
                },
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Tag',
              },
              createdAt: '2022-11-29T09:16:40+09:00',
              updatedAt: '2022-11-29T09:16:40+09:00',
              __typename: 'TaskTag',
            },
          ],
          taskCollaborators: [],
          subTasks: [],
          parentTask: null,
          projectTasks: [
            {
              id: '0BC01GK0BWBA4G55H3FPK8D6RKBRF',
              taskId: '0BA01GK0BWB1Z78B3A3PK7J2DGG20',
              projectId: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
              projectTaskSectionId: '0AY01GK0BWB63MCY28B35M1XB6H6A',
              project: {
                id: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
                name: 'App Development',
                projectBaseColorId: '0AI01GK0BWARZDJ7DV0QC8D00VKEN',
                projectLightColorId: '0AJ01GK0BWASYFS2ABT0SKNJT7H04',
                projectIconId: '0AK01GK0BWAVC6X7D4HNHZ06N4ADE',
                description: {
                  content: [
                    {
                      content: [
                        {
                          attrs: {
                            mentionId: '',
                            mentionType: '',
                          },
                          text: 'Welcome to the App Development team! We’ll be using this project to track our progress on our Q1 product launch. Final ad designs are in the “Key Resources” section below. Use this form to submit new ideas! 😆',
                          type: 'text',
                        },
                      ],
                      type: 'paragraph',
                    },
                    {
                      content: null,
                      type: 'paragraph',
                    },
                    {
                      content: null,
                      type: 'paragraph',
                    },
                    {
                      content: null,
                      type: 'paragraph',
                    },
                    {
                      content: null,
                      type: 'paragraph',
                    },
                  ],
                  type: 'doc',
                },
                descriptionTitle: "How we'll collaborate",
                teammateIds: [
                  '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
                  '0AC01GK0BWAQM2G89ZEQW6V2CG974',
                  '0AC01GK0BWAQM2G89ZEQW6XCNRHWV',
                ],
                projectTeammates: [
                  {
                    id: '0AH01GK0BWAXJ1S3A8ZD03128ZZYF',
                    isOwner: true,
                    role: '',
                    projectId: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
                    teammateId: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
                    teammate: {
                      id: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
                      name: 'Manato Kuroda',
                      image: '/images/cat_img.png',
                      email: 'manato.kuroda@example.com',
                      createdAt: '2022-11-29T09:16:39+09:00',
                      updatedAt: '2022-11-29T09:16:39+09:00',
                      __typename: 'Teammate',
                    },
                    createdAt: '2022-11-29T09:16:39+09:00',
                    updatedAt: '2022-11-29T09:16:39+09:00',
                    __typename: 'ProjectTeammate',
                  },
                  {
                    id: '0AH01GK0BWAXJ1S3A8ZD033SJMMXV',
                    isOwner: false,
                    role: '',
                    projectId: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
                    teammateId: '0AC01GK0BWAQM2G89ZEQW6V2CG974',
                    teammate: {
                      id: '0AC01GK0BWAQM2G89ZEQW6V2CG974',
                      name: 'Dan Abrahmov',
                      image: '/images/dan.jpg',
                      email: 'dan.abrahmov@example.com',
                      createdAt: '2022-11-29T09:16:39+09:00',
                      updatedAt: '2022-11-29T09:16:39+09:00',
                      __typename: 'Teammate',
                    },
                    createdAt: '2022-11-29T09:16:39+09:00',
                    updatedAt: '2022-11-29T09:16:39+09:00',
                    __typename: 'ProjectTeammate',
                  },
                  {
                    id: '0AH01GK0BWAXJ1S3A8ZD036H4RMBP',
                    isOwner: false,
                    role: '',
                    projectId: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
                    teammateId: '0AC01GK0BWAQM2G89ZEQW6XCNRHWV',
                    teammate: {
                      id: '0AC01GK0BWAQM2G89ZEQW6XCNRHWV',
                      name: 'Kent Dodds',
                      image: '/images/kent.jpg',
                      email: 'kent.dodds@example.com',
                      createdAt: '2022-11-29T09:16:39+09:00',
                      updatedAt: '2022-11-29T09:16:39+09:00',
                      __typename: 'Teammate',
                    },
                    createdAt: '2022-11-29T09:16:39+09:00',
                    updatedAt: '2022-11-29T09:16:39+09:00',
                    __typename: 'ProjectTeammate',
                  },
                ],
                dueDate: '2022-11-29T09:16:39+09:00',
                createdBy: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Project',
              },
              createdAt: '2022-11-29T09:16:40+09:00',
              updatedAt: '2022-11-29T09:16:40+09:00',
              __typename: 'ProjectTask',
            },
          ],
          isNew: false,
          taskParentId: '',
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
        workspaceId: '0AD01GK0BWAQZYWRN2T89M5K2620Z',
        createdAt: '2022-11-29T09:16:40+09:00',
        updatedAt: '2022-11-29T09:16:40+09:00',
        __typename: 'TeammateTask',
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
