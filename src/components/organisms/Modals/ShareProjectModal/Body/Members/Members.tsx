import React, { memo, useMemo } from 'react'
import { Flex, Text } from 'src/components/atoms'
import { useLinkStyle } from 'src/hooks'
import { useTeammateIdsByProjectId } from 'src/store/entities/projectTeammate'
import { BodyHeader } from '../BodyHeader'
import { BodyStack } from '../BodyStack'
import { MemberListItem } from './MemberListItem'
import { MembersAndCollaboratorsListItem } from './MembersAndCollaboratorsListItem'

type Props = {
  projectId: string
  loading: boolean
  onSetShareTab: () => void
}

export const Members: React.VFC<Props> = memo<Props>((props) => {
  const { projectId, onSetShareTab } = props
  const { teammateIds } = useTeammateIdsByProjectId(projectId)
  const headerText = useMemo(
    () => `${teammateIds.length} members`,
    [teammateIds.length],
  )
  const { style } = useLinkStyle()

  return (
    <BodyStack flex={1}>
      <Flex flex={1} px={6}>
        <BodyHeader>{headerText}</BodyHeader>
        <Text
          ml="auto"
          mt={1}
          {...style}
          fontWeight="medium"
          fontSize="xs"
          onClick={onSetShareTab}
        >
          Share project
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <MembersAndCollaboratorsListItem projectId={projectId} />
        {teammateIds.map((id) => (
          <MemberListItem teammateId={id} key={id} projectId={projectId} />
        ))}
      </Flex>
    </BodyStack>
  )
})
Members.displayName = 'Members'
