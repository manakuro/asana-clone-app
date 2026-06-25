import { ComingSoonTooltip } from '@/components/features/tooltips';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { NewBox } from '@/components/ui/new-box';
import { Text } from '@/components/ui/text';
import { useClickableHoverStyle } from '@/hooks/styles/use-clickable-hover-style';
import { Container } from './container';

type Props = FlexProps;

export function ProjectListItemNew(props: Props) {
  const { clickableHoverLightStyle } = useClickableHoverStyle();

  return (
    <Container {...props}>
      <ComingSoonTooltip>
        <NewBox size="md" />
        <Flex ml={3} flex={1} alignItems="center">
          <Text fontSize="sm" {...clickableHoverLightStyle}>
            New Project
          </Text>
        </Flex>
      </ComingSoonTooltip>
    </Container>
  );
}
