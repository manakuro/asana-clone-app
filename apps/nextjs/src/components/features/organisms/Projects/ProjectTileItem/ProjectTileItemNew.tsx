import type React from 'react';
import { ComingSoonTooltip } from 'src/components/features/molecules/Tooltips';
import { DashedBox, Flex, type FlexProps, Icon } from 'src/components/ui/atoms';
import { transitions } from 'src/styles';
import { Container } from './Container';

type Props = {
  containerStyle?: FlexProps;
};

export const ProjectTileItemNew: React.FC<Props> = (props) => {
  const { containerStyle } = props;
  return (
    <Container name="New Project" {...containerStyle}>
      {({ showTransition }) => (
        <ComingSoonTooltip>
          <DashedBox borderRadius="3xl" p={2} w="120px" h="120px">
            <Flex
              {...(showTransition
                ? {
                    transform: 'translate(0, -3px)',
                  }
                : {})}
              transition={transitions.base()}
            >
              <Icon size="3xl" icon="plus" />
            </Flex>
          </DashedBox>
        </ComingSoonTooltip>
      )}
    </Container>
  );
};
