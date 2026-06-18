import { memo } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { useProject } from '@/store/entities/project';

type Props = {
  projectId: string;
};

export const Header = memo(function Header(props: Props) {
  const { project } = useProject(props.projectId);

  return <Dialog.Header>Share {project.name}</Dialog.Header>;
});
