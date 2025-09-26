import { memo } from 'react';
import { Container } from './Container';

type Props = {
  tasksTaskColumnId: string;
};

export const Tags = memo(function Tags(props: Props) {
  const { tasksTaskColumnId } = props;

  return <Container clickable tasksTaskColumnId={tasksTaskColumnId} menu />;
});
