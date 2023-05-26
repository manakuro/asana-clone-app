import React, { memo } from 'react'
import { TasksListRow } from 'src/components/features/organisms/Tasks'
import { TasksListCell } from 'src/components/features/organisms/Tasks/TasksList/TasksListCell'
import { Flex, Skeleton } from 'src/components/ui/atoms'

const TEXT_HEIGHT = '16px'
export const SkeletonListContent: React.FC = memo(() => {
  return (
    <Flex px={6} flex={1}>
      <Flex flex={1} flexDirection="column">
        <Flex>
          <TasksListCell
            containerStyle={{ w: 'calc(600px - 24px)' }}
            pl={0}
            borderLeft="none"
          />
          <TasksListCell containerStyle={{ w: '120px' }} />
          <TasksListCell containerStyle={{ w: '120px' }} />
          <TasksListCell containerStyle={{ w: '120px' }} />
          <TasksListCell containerStyle={{ flex: 1 }} borderRight="none" />
        </Flex>
        <Flex flex={1} flexDirection="column">
          <Flex h="50px" alignItems="center">
            <Skeleton h={TEXT_HEIGHT} w="20px" borderRadius="full" ml={2} />
            <Skeleton h={TEXT_HEIGHT} w="138px" borderRadius="full" ml={3} />
          </Flex>
          <Flex flexDirection="column" ml={8}>
            {['40%', '32%', '38%', '42%', '50%', '40%', '41%'].map((w, i) => (
              <TasksListRow key={i} alignItems="center">
                <Skeleton h={TEXT_HEIGHT} w="20px" borderRadius="full" />
                <Skeleton h={TEXT_HEIGHT} w={w} ml={2} borderRadius="full" />
              </TasksListRow>
            ))}
          </Flex>
          <Flex h="50px" alignItems="center">
            <Skeleton h={TEXT_HEIGHT} w="20px" borderRadius="full" ml={2} />
            <Skeleton h={TEXT_HEIGHT} w="138px" borderRadius="full" ml={3} />
          </Flex>
          <Flex flexDirection="column" ml={8}>
            {['39%', '30%', '38%', '42%'].map((w, i) => (
              <TasksListRow key={i} alignItems="center">
                <Skeleton h={TEXT_HEIGHT} w="20px" borderRadius="full" />
                <Skeleton h={TEXT_HEIGHT} w={w} ml={2} borderRadius="full" />
              </TasksListRow>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
})
SkeletonListContent.displayName = 'SkeletonListContent'
